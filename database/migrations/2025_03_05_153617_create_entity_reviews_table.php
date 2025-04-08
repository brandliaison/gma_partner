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
        Schema::create('entity_reviews', function (Blueprint $table) {
            $table->id();
            $table->string('entity_type');
            $table->string('entity_revision_id');
            $table->string('reviewed_by');
            $table->text('review_comment');
            $table->text('review_status');
            $table->text('from_platform');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entity_reviews');
    }
};
