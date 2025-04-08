<?php

namespace App\Http\Controllers\Operations;

use App\CommonHelpers\CommonHelpers;
use App\Http\Controllers\Controller;
use App\Models\OP\EntityReview;
use App\Models\OP\EntityRevision;
use App\Models\OP\Service;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EntityReviewController extends Controller
{
    // Fetch all Revisions for a category
    public function getRevisions(Request $request)
    {
        $entity = EntityRevision::with('reviews')->where('entity_id', $request->entity_id)->orderBy('created_at', 'desc')->get();

        if (!count($entity) > 0) {
            return response()->json(['message' => ucfirst($request->entity_type) . ' Revisions not found'], 404);
        }

        return response()->json(['data' => $entity, 'message' => 'Data Found'], 200);
    }

    // Fetch all Revision Single for a category
    public function getRevision($revisionId)
    {
        $entity = EntityRevision::find($revisionId);

        if (!$entity) {
            return response()->json(['message' => 'Revision not found'], 404);
        }

        return response()->json($entity);
    }

    public function addReview(Request $request)
    {
        $entity = EntityRevision::find($request->revision_id);

        $entity_type = CommonHelpers::checkEntityType($entity->entity_type, $entity->entity_id);

        if (!$entity) {
            return response()->json(['message' => 'Entity Revision not found'], 404);
        }

        $validated = $request->validate([
            'revision_id' => 'required|exists:entity_revisions,_id',
            'review_status' => 'required|in:approved,rejected,changes_required',
            'review_comment' => 'nullable|string',
        ]);

        $review = EntityReview::create([
            'reviewed_by' => Auth::id(),
            'entity_type' => $entity->entity_type,
            'entity_revision_id' => $request->revision_id,
            'review_status' => $validated['review_status'],
            'review_comment' => $validated['review_comment'],
            'from_platform' => 'operations',
        ]);

        if ($request->review_status == 'rejected') {
            $entity_type->update([
                'approval_status' => 'rejected',
                'first_approver' => Auth::id(),
                'first_approved_date' => now()->toDateTimeString()
            ]);
            $entity->update(['status' => 'rejected']);
        }
        if ($request->review_status == 'approved') {
            if ($entity_type->approval_status === 'partially_approved') {
                $entity_type->update(['approval_status' => 'approved', 'status' => 'active', 'final_approver' => Auth::id(), 'final_approved_date' => Carbon::now()->toDateTimeString()]);
                $entity->update(['status' => 'approved']);
            } else {
                $entity_type->update(['approval_status' => 'partially_approved', 'first_approver' => Auth::id(), 'first_approved_date' => Carbon::now()->toDateTimeString()]);
                $entity->update(['status' => 'partially_approved']);
            }
        }

        return response()->json([
            'message' => 'Review added successfully',
            'review' => $review,
        ]);
    }

    public function entityList()
    {
        $list = [
            'Blog' => 'Blog',
            'BlogCategory' => 'Blog Category',
            'Service' => 'Service',
            'ServiceCategory' => 'Service Category',
            'ServiceSection' => 'Service Section',
            'Notification' => 'Notification',
            'NotificationCategory' => 'Notification Category',
            'Product' => 'Product',
            'ProductCategory' => 'Product Category',
            'Faq' => 'Faq',
            'FaqCategory' => 'Faq Category',
            'TutorialVideoCategory' => 'Tutorial Video Category',
            'TutorialVideo' => 'Tutorial Video',
        ];

        return response()->json(['data' => $list]);
    }

    public function entityDataList(Request $request)
    {
        $namespace = "App\\Models\\OP\\";
        $modelClass = $namespace . $request->entity_type;

        $data = [];
        if (class_exists($modelClass)) {
            $data = app($modelClass)->with('createdByUser')->whereIn('approval_status', ['submitted', 'partially_approved'])->orderBy('created_at', 'desc')->get();
        }

        return response()->json($data);
    }
}
