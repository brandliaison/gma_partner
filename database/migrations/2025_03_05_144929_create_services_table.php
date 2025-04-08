<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug');
            $table->string('service_category_id');
            $table->string('image_url');
            $table->string('image_alt');
            $table->text('description')->nullable();
            $table->text('compliance_header')->nullable();
            $table->string('revised_by')->nullable();
            $table->string('first_approver')->nullable();
            $table->date('first_approved_date')->nullable();
            $table->string('final_approver')->nullable();
            $table->date('final_approved_date')->nullable();
            $table->string('from_platform')->nullable();
            $table->string('created_by')->nullable();
            $table->string('approval_status')->nullable();
            $table->string('status')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
