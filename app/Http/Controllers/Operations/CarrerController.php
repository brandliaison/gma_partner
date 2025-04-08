<?php

namespace App\Http\Controllers\Operations;

use App\Http\Controllers\Controller;
use App\Models\OP\Career;
use App\Models\OP\JobApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CarrerController extends Controller
{
    public function index()
    {
        $data = Career::get();

        if (!count($data) > 0) {
            return response()->json(['data' => [], 'message' => 'Data Not Found'], 200);
        }

        return response()->json(['data' => $data, 'message' => 'Data Found'], 200);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'job_type' => 'required|in:general,current_opening',
            'expertise' => 'nullable|array',
            'positions' => 'required|integer|min:1',
        ]);

        $validatedData['is_active'] = true;
        $career = Career::create($validatedData);
        return response()->json(['data' => $career, 'message' => 'Career Created Successfully'], 201);
    }

    // Show a single career
    public function show($id)
    {
        $career = Career::find($id);

        if (!$career) {
            return response()->json(['message' => 'Career Not Found'], 404);
        }

        return response()->json(['data' => $career], 200);
    }

    // Update career
    public function update(Request $request, $id)
    {
        $career = Career::find($id);

        if (!$career) {
            return response()->json(['message' => 'Career Not Found'], 404);
        }

        $validatedData = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'job_type' => 'sometimes|in:general,current_opening',
            'expertise' => 'nullable|array',
            'positions' => 'sometimes|integer|min:1',
            'is_active' => 'boolean',
        ]);

        $career->update($validatedData);
        return response()->json(['data' => $career, 'message' => 'Career Updated Successfully'], 200);
    }

    // Delete career
    public function destroy($id)
    {
        $career = Career::find($id);

        if (!$career) {
            return response()->json(['message' => 'Career Not Found'], 404);
        }

        $career->delete();
        return response()->json(['message' => 'Career Deleted Successfully'], 200);
    }

    public function getActiveJobs()
    {
        $data = Career::where('is_active', true)->get();

        if (!count($data) > 0) {
            return response()->json(['data' => [], 'message' => 'Data Not Found'], 200);
        }

        return response()->json(['data' => $data, 'message' => 'Data Found'], 200);
    }

    public function applyJob(Request $request)
    {
        $request->validate([
            'job_id' => 'required|exists:careers,_id',
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'mobile' => 'required|string|max:20',
            'city' => 'required|string|max:100',
            'cv' => 'required|file|mimes:pdf,doc,docx|max:2048',
        ]);

        // Upload CV
        $cvPath = "";
        if ($request->hasFile('cv')) {
            $filePath = $request->file('cv')->store('job_cvs', 'public');
            $cvPath = Storage::url($filePath);
        }

        $applicant = JobApplication::create([
            'job_id' => $request->job_id,
            'name' => $request->name,
            'email' => $request->email,
            'mobile' => $request->mobile,
            'city' => $request->city,
            'cv' => $cvPath,
        ]);

        return response()->json(['data' => $applicant, 'message' => 'Application submitted successfully'], 201);

    }

    public function jobApplication()
    {
        $data = JobApplication::with('job')->get();

        if (!count($data) > 0) {
            return response()->json(['data' => [], 'message' => 'Data Not Found'], 200);
        }

        return response()->json(['data' => $data, 'message' => 'Data Found'], 200);
    }
}
