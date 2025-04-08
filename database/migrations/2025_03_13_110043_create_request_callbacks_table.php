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
        Schema::create('request_callbacks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('country_code');
            $table->string('phone');
            $table->string('country');
            $table->string('organization');
            $table->longText('message');
            $table->string('time'); // Preferred time for callback

            // Staff actions
            $table->string('replied')->nullable(); // Yes/No
            $table->string('reply_via')->nullable(); // Email/Phone
            $table->string('reply_by')->nullable(); // Staff ID
            $table->string('status')->default('pending');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('request_callbacks');
    }
};
