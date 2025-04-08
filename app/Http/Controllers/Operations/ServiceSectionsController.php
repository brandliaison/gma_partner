<?php

namespace App\Http\Controllers\Operations;

use App\Http\Controllers\Controller;
use App\Models\OP\EntityRevision;
use App\Models\OP\Service;
use App\Models\OP\ServiceSection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ServiceSectionsController extends Controller
{
    // Get all services
    public function index()
    {
        $data = ServiceSection::where(function ($query) {
            $query->where('status', 'active')
                ->orWhere('created_by', Auth::id());
            })
            ->with('service')
            ->get();

            if (!count($data) > 0) {
                return response()->json(['data' => [], 'message' => 'Data Not Found'], 200);
            }

            return response()->json(['data' => $data, 'message' => 'Data Found'], 200);
    }

    // Store a new service
    public function store(Request $request)
    {
        $service = Service::find($request->service_id);

        if (!$service || $service->status !== 'active') {
            return response()->json(['error' => 'Service Not Found'], 404);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'service_id' => 'required|exists:services,_id',
            'image_url' => 'nullable',
            'image_alt' => 'nullable|string|max:255',
            'content' => 'nullable|string',
        ]);

        $validated['slug'] = isset($request->slug) ? Str::slug($request->slug) : Str::slug($request->name);
        $validated['status'] = 'inactive';
        $validated['approval_status'] = 'submitted';
        $validated['created_by'] = Auth::user()->_id;

        $serviceSection = ServiceSection::create($validated);
        if ($serviceSection) {
            EntityRevision::create([
                'entity_type' => 'ServiceSection',
                'entity_id' => $serviceSection->_id,
                'old_data' => null,
                'new_data' => $serviceSection->with('service')->find($serviceSection->_id),
                'revised_by' => Auth::user()->_id ?? 'System', // Track the reviser
                'from_platform' => 'operations',
            ]);
        }

        return response()->json($serviceSection, 201);
    }

    // Get a single data
    public function show($id)
    {
        $service = ServiceSection::find($id);
        if (!$service) {
            return response()->json(['error' => 'Service Section Not Found'], 404);
        }
        return response()->json($service->load('service', 'revisions'));
    }

    // Update service
    public function update(Request $request, string $id)
    {
        $service = Service::find($request->service_id);

        if (!$service || $service->status !== 'active') {
            return response()->json(['error' => 'Service Not Found'], 404);
        }

        $serviceSection = ServiceSection::with('service')->find($id);
        $oldservicesection = clone $serviceSection;
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'service_id' => 'required|exists:services,_id',
            'image_url' => 'nullable',
            'image_alt' => 'nullable|string|max:255',
            'content' => 'nullable|string',
        ]);

        if (!$serviceSection) {
            return response()->json(['error' => 'Service Section Not Found'], 404);
        }

        $validated['slug'] = isset($request->slug) ? Str::slug($request->slug) : Str::slug($request->name);

        $serviceSection->update($validated);

        if ($serviceSection) {
            EntityRevision::create([
                'entity_type' => 'ServiceSection',
                'entity_id' => $serviceSection->_id,
                'old_data' => $oldservicesection,
                'new_data' => ServiceSection::with('service')->find($serviceSection->_id),
                'revised_by' => Auth::user()->_id ?? 'System', // Track the reviser
                'from_platform' => 'operations',
            ]);
        }

        return response()->json($service);
    }

    // Delete service
    public function destroy($id)
    {
        $serviceSection = ServiceSection::find($id);
        $serviceSection->delete();

        return response()->json(['message' => 'Service Section deleted successfully']);
    }
}
