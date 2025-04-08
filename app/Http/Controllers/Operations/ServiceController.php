<?php

namespace App\Http\Controllers\Operations;

use App\Http\Controllers\Controller;
use App\Models\OP\EntityRevision;
use App\Models\OP\Service;
use App\Models\OP\ServiceCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class ServiceController extends Controller
{
    // Get all services
    public function index()
    {
        $data = Service::where(function ($query) {
            $query->where('status', 'active')
                ->orWhere('created_by', Auth::id());
            })
            ->with('category')->orderBy('created_at', 'desc')
            ->get();

        if (!count($data) > 0) {
            return response()->json(['data' => [], 'message' => 'Data Not Found'], 200);
        }

        return response()->json(['data' => $data, 'message' => 'Data Found'], 200);
    }

    // Store a new service
    public function store(Request $request)
    {
        $serviceCat = ServiceCategory::find($request->service_category_id);

        // if (!$serviceCat || $serviceCat->status !== 'active') {
        //     return response()->json(['error' => 'Service Category Not Found'], 404);
        // }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'service_category_id' => 'required|exists:service_categories,_id',
            'image_url' => 'nullable',
            'image_alt' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'compliance_header' => 'nullable|string',
        ]);

        $validated = $request->except('image_url');
        if ($request->hasFile('image_url')) {
            $filePath = $request->file('image_url')->store('services', 'public');
            $validated['image_url'] = Storage::url($filePath);
        }

        $validated['slug'] = isset($request->slug) ? Str::slug($request->slug) : Str::slug($request->name);
        $validated['status'] = 'inactive';
        $validated['approval_status'] = 'submitted';
        $validated['created_by'] = Auth::user()->_id;

        $service = Service::create($validated);
        if ($service) {
            EntityRevision::create([
                'entity_type' => 'Service',
                'entity_id' => $service->_id,
                'old_data' => null,
                'new_data' => $service->with('category')->find($service->_id),
                'revised_by' => Auth::user()->_id ?? 'System', // Track the reviser
                'from_platform' => 'operations',
            ]);
        }

        return response()->json($service, 201);
    }

    // Get a single service
    public function show($id)
    {
        $service = Service::with('category', 'revisions.reviews')->find($id);
        if (!$service) {
            return response()->json(['error' => 'Service Not Found'], 404);
        }
        return response()->json($service);
    }

    // Update service
    public function update(Request $request, string $id)
    {
        $serviceCat = ServiceCategory::find($request->service_category_id);

        // if (!$serviceCat || $serviceCat->status !== 'active') {
        //     return response()->json(['error' => 'Service Category Not Found'], 404);
        // }

        $service = Service::with('category')->find($id);
        $oldservice = clone $service;
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'service_category_id' => 'required|exists:service_categories,_id',
            'image_url' => 'sometimes',
            'image_alt' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'compliance_header' => 'nullable|string',
            'status' => 'nullable|string',
        ]);

        if (!$service) {
            return response()->json(['error' => 'Service Not Found'], 404);
        }

        $validated['slug'] = isset($request->slug) ? Str::slug($request->slug) : Str::slug($request->name);

        $validated = $request->except('image_url');
        if ($request->hasFile('image_url')) {
            $filePath = $request->file('image_url')->store('services', 'public');
            $validated['image_url'] = Storage::url($filePath);
        }

        $service->update($validated);

        if ($service) {
            EntityRevision::create([
                'entity_type' => 'Service',
                'entity_id' => $service->_id,
                'old_data' => $oldservice,
                'new_data' => Service::with('category')->find($service->_id),
                'revised_by' => Auth::user()->_id ?? 'System', // Track the reviser
                'from_platform' => 'operations',
            ]);
        }

        return response()->json($service);
    }

    // Delete service
    public function destroy(Service $service)
    {
        $service->delete();

        return response()->json(['message' => 'Service deleted successfully']);
    }

    public function activeServices(){
        $data = Service::where('status', 'active')->get();

        if (!count($data) > 0) {
            return response()->json(['data' => [], 'message' => 'Data Not Found'], 200);
        }

        return response()->json(['data' => $data, 'message' => 'Data Found'], 200);
    }
}
