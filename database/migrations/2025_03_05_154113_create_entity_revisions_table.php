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
        Schema::create('entity_revisions', function (Blueprint $table) {
            $table->id();
            $table->string('entity_type');
            $table->foreignId('entity_id')->constrained()->onDelete('cascade');
            $table->json('old_data')->nullable();
            $table->json('new_data')->nullable();
            $table->string('revised_by')->nullable();
            $table->string('from_platform')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entity_revisions');
    }
};
