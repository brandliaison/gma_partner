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
        Schema::create('service_partners', function (Blueprint $table) {
            $table->id();
            $table->string('reg_type');
            $table->enum('country', ['India', 'Other']);
            $table->string('org_name')->nullable();
            $table->string('name');
            $table->string('designation')->nullable();
            $table->string('email')->unique();
            $table->string('email_otp')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('mobile')->unique();
            $table->string('mobile_otp')->nullable();
            $table->timestamp('mobile_verified_at')->nullable();
            $table->string('alt_mobile')->nullable();
            $table->string('password')->nullable();
            $table->string('country');
            $table->string('state');
            $table->string('district');
            $table->string('pincode');

            // Conditional fields for India
            $table->string('aadhar_number')->nullable();
            $table->string('aadhar_verified')->nullable();
            $table->text('aadhar_details')->nullable();
            $table->string('gst_number')->nullable();
            $table->string('gst_verified')->nullable();
            $table->text('gst_details')->nullable();
            $table->text('office_address')->nullable();
            $table->text('office_district')->nullable();
            $table->text('office_state')->nullable();
            $table->text('office_pincode')->nullable();
            $table->date('dob')->nullable();

            // Conditional file upload for other countries
            $table->string('id_card')->nullable();

            // Academic details (handled separately)
            $table->text('academic_details')->nullable(); // JSON format

            // Experience
            $table->string('experience_years')->nullable();
            $table->string('experience_months')->nullable();

            $table->string('team_size')->nullable();
            $table->string('branch_address')->nullable();
            $table->string('branch_district')->nullable();
            $table->string('branch_state')->nullable();
            $table->string('branch_pincode')->nullable();

            // Skills / Services
            $table->text('skills')->nullable(); // JSON format

            // Business
            $table->string('business_title')->nullable();
            $table->string('business_description')->nullable();

            // Uploads
            $table->string('profile_photo')->nullable();
            $table->string('photo')->nullable();

            // Agreement
            $table->boolean('agreed_terms')->default(false);

            // Status
            $table->string('status')->default('pending');
            $table->string('steps')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_partners');
    }
};
