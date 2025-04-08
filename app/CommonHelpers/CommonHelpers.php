<?php

namespace App\CommonHelpers;

use App\Models\OP\Service;
use Illuminate\Support\Facades\Http;

class CommonHelpers
{
    protected $factorKey;

    public function __construct($factorKey)
    {
        $this->factorKey = "68791e1c-0787-499f-84cd-d00a6e481c6b";
    }

    public static function checkEntityType($entity_type, $entity_id)
    {
        // if ($entity_type === "Service") {
        //     return \App\Models\OP\Service::find($entity_id);
        // }

        // if ($entity_type === "ServiceCategory") {
        //     return \App\Models\OP\ServiceCategory::find($entity_id);
        // }

        // if ($entity_type === "ServiceSection") {
        //     return \App\Models\OP\ServiceSection::find($entity_id);
        // }

        // if ($entity_type === "NotificationCategory") {
        //     return \App\Models\OP\NotificationCategory::find($entity_id);
        // }

        // if ($entity_type === "Blog") {
        //     return \App\Models\OP\Blog::find($entity_id);
        // }

        // if ($entity_type === "BlogCategory") {
        //     return \App\Models\OP\BlogCategory::find($entity_id);
        // }

        // if ($entity_type === "Product") {
        //     return \App\Models\OP\Product::find($entity_id);
        // }

        // if ($entity_type === "ProductCategory") {
        //     return \App\Models\OP\ProductCategory::find($entity_id);
        // }

        $namespace = "App\\Models\\OP\\"; // Base namespace for your models
        $modelClass = $namespace . $entity_type; // Dynamically create full class name

        if (class_exists($modelClass)) {
            return app($modelClass)->find($entity_id); // Create instance and find entity
        }

        return null;
    }

    public static function sendOtp($mobile, $otp)
    {
        $response = Http::get('https://2factor.in/API/V1/68791e1c-0787-499f-84cd-d00a6e481c6b/SMS/+91' . $mobile . '/' . $otp . '/mobile verification');

        // Get response data
        $data = $response->json();

        // Check if the request was successful
        if ($response->successful()) {
            return $data;
        } else {
            return response()->json(['error' => $response . 'Failed to send OTP'], 500);
        }
    }
}
