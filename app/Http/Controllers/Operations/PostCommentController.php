<?php

namespace App\Http\Controllers\Operations;

use App\Http\Controllers\Controller;
use App\Models\OP\PostComment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostCommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(PostComment::latest()->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'post_type' => 'required|string',
            'post_id' => 'required|string',
            'comment' => 'required|string',
            'user_id' => 'required|string',
            'from_platform' => 'nullable|string',
        ]);

        $validated['status'] = 'pending';
        $validated['user_id'] = Auth::id();
        $validated['from_platform'] = 'user';
        $comment = PostComment::create($validated);

        return response()->json($comment, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $comment = PostComment::findOrFail($id);
        return response()->json($comment);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'comment' => 'required|string',
            'status' => 'nullable|string|in:pending,approved,rejected',
        ]);

        $comment = PostComment::findOrFail($id);
        $comment->update($validated);

        return response()->json($comment);
    }

    // Approve Comment
    public function approve($id)
    {
        $comment = PostComment::findOrFail($id);
        $comment->update([
            'status' => 'approved',
            'approved_by' => Auth::id(),
        ]);

        return response()->json(['message' => 'Comment approved successfully', 'comment' => $comment]);
    }

    // Reject Comment
    public function reject($id)
    {
        $comment = PostComment::findOrFail($id);
        $comment->update([
            'status' => 'rejected',
            'approved_by' => Auth::id(),
        ]);

        return response()->json(['message' => 'Comment rejected successfully', 'comment' => $comment]);
    }

    // Delete Comment
    public function destroy($id)
    {
        $comment = PostComment::findOrFail($id);
        $comment->delete();

        return response()->json(['message' => 'Comment deleted successfully']);
    }
}
