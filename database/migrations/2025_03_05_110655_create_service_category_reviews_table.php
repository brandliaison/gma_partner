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
        Schema::create('service_category_reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_category_id')->constrained()->onDelete('cascade'); // Links to service_categories
            $table->foreignId('service_category_revision_id')->constrained()->onDelete('cascade'); // Links to service_categories_revision
            $table->foreignId('reviewed_by')->constrained('op_staffs')->onDelete('set null'); // Who reviewed
            $table->string('review_status'); // approved, rejected, changes_required
            $table->text('review_comment')->nullable();
            $table->string('from_platform')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_category_reviews');
    }
};
