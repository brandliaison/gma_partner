<?php


use App\Http\Controllers\ItStaff\StaffController;
use App\Http\Controllers\Operations\AuthController;
use App\Http\Controllers\Operations\BlogCategoryController;
use App\Http\Controllers\Operations\BlogController;
use App\Http\Controllers\Operations\BrochureCategoryController;
use App\Http\Controllers\Operations\BrochureController;
use App\Http\Controllers\Operations\CarrerController;
use App\Http\Controllers\Operations\ChannelPartnerController;
use App\Http\Controllers\Operations\DesignationController;
use App\Http\Controllers\Operations\EnquiryController;
use App\Http\Controllers\Operations\EntityReviewController;
use App\Http\Controllers\Operations\FaqCategoryController;
use App\Http\Controllers\Operations\FaqController;
use App\Http\Controllers\Operations\GalleryController;
use App\Http\Controllers\Operations\NotificationCategoryController;
use App\Http\Controllers\Operations\NotificationController;
use App\Http\Controllers\Operations\OpStaffController;
use App\Http\Controllers\Operations\ServiceCategoryController;
use App\Http\Controllers\Operations\ServiceController;
use App\Http\Controllers\Operations\ServiceSectionsController;
use App\Http\Controllers\Operations\TutorialVideoCategoryController;
use App\Http\Controllers\Operations\TutorialVideoController;
use App\Http\Controllers\Operations\PostCommentController;
use App\Http\Controllers\Operations\ProductCategoryController;
use App\Http\Controllers\Operations\ProductController;
use App\Http\Controllers\Operations\RequestCallbackController;
use App\Http\Controllers\Operations\ServicePartnerController;
use App\Http\Controllers\Operations\TicketController;
use App\Http\Controllers\Operations\TicketsCategoryController;
use App\Http\Middleware\MultiAuthMiddleware;
use Illuminate\Support\Facades\Route;

Route::prefix('v1/op-admin')->name('operations.')->group(function () {
    Route::post('login', [AuthController::class, 'login']);

    Route::middleware(MultiAuthMiddleware::class)->group(function () {
        Route::apiResource('operations-designation', DesignationController::class);
        Route::apiResource('op-staff', OpStaffController::class);
        Route::post('/change-password', [StaffController::class, 'changePassword']);
        Route::post('/change-staff-password', [StaffController::class, 'changeStaffPassword']);
        Route::post('/change-staff-status', [StaffController::class, 'changeStaffStatus']);
    });


    Route::middleware(['auth:opstaff'])->group(function () {

        // Services
        Route::apiResource('service-categories', ServiceCategoryController::class);
        Route::apiResource('services', ServiceController::class);
        Route::apiResource('services-sections', ServiceSectionsController::class);

        // Notifications
        Route::apiResource('notification-categories', NotificationCategoryController::class);
        Route::get('active-notification-categories', [NotificationCategoryController::class, 'activeNotificationCategories']);
        Route::apiResource('notifications', NotificationController::class);

        // Tutorial Videos
        Route::apiResource('tutorial-videos-categories', TutorialVideoCategoryController::class);
        Route::get('active-tutorial-videos-categories', [TutorialVideoCategoryController::class, 'activeTutorialVideoCategories']);
        Route::apiResource('tutorial-videos', TutorialVideoController::class);

        // Blogs
        Route::apiResource('blog-categories', BlogCategoryController::class);
        Route::get('active-blog-categories', [BlogCategoryController::class, 'activeBlogCategories']);
        Route::apiResource('blogs', BlogController::class);

        // Products
        Route::apiResource('product-categories', ProductCategoryController::class);
        Route::get('active-product-categories', [ProductCategoryController::class, 'activeProductCategories']);
        Route::apiResource('products', ProductController::class);

        // Posts Comments
        Route::apiResource('post-comments', PostCommentController::class);

        // Approval Actions
        Route::post('post-comments/{id}/approve', [PostCommentController::class, 'approve']); // Approve comment
        Route::post('post-comments/{id}/reject', [PostCommentController::class, 'reject']); // Reject comment

        // Get entity revisions
        Route::post('entity-revisions', [EntityReviewController::class, 'getRevisions']);
        Route::get('entity-revision/{id}', [EntityReviewController::class, 'getRevision']);
        Route::post('add-review', [EntityReviewController::class, 'addReview']);
        Route::get('entity-list', [EntityReviewController::class, 'entityList']);
        Route::post('entity-data-list', [EntityReviewController::class, 'entityDataList']);

        // Tickets
        Route::apiResource('tickets-categories', TicketsCategoryController::class);
        Route::apiResource('tickets', TicketController::class);
        Route::post('assign-ticket', [TicketController::class, 'assignTicket']);
        Route::post('update-ticket-status', [TicketController::class, 'updateStatus']);
        Route::post('ticket-reply', [TicketController::class, 'replyTicket']);

        //Brochure
        Route::apiResource('brochure-categories', BrochureCategoryController::class);
        Route::apiResource('brochures', BrochureController::class);

        //FAQ
        Route::apiResource('faq-categories', FaqCategoryController::class);
        Route::get('active-faq-categories', [FaqCategoryController::class, 'activeFaqCategories']);
        Route::apiResource('faq', FaqController::class);

        // Gallery
        Route::apiResource('galleries', GalleryController::class);

        // Contact Enquiries
        Route::apiResource('enquiries', EnquiryController::class)->except(['store']);

        // Request Callback
        Route::apiResource('request-callbacks', RequestCallbackController::class)->except(['store']);

        // Service Partner
        Route::get('service-partners', [ServicePartnerController::class, 'index']);
        Route::get('service-partner-details/{id}', [ServicePartnerController::class, 'show']);
        Route::get('service-partner-details/{id}/approve', [ServicePartnerController::class, 'approve']);
        Route::get('service-partner-details/{id}/reject', [ServicePartnerController::class, 'reject']);

        // Channel Partner
        Route::get('channel-partners', [ChannelPartnerController::class, 'index']);
        Route::get('channel-partner-details/{id}', [ChannelPartnerController::class, 'show']);
        Route::get('channel-partner-details/{id}/approve', [ChannelPartnerController::class, 'approve']);
        Route::get('channel-partner-details/{id}/reject', [ChannelPartnerController::class, 'reject']);

        // Careers
        Route::get('/careers', [CarrerController::class, 'index']);
        Route::post('/careers', [CarrerController::class, 'store']);
        Route::get('/careers/{id}', [CarrerController::class, 'show']);
        Route::put('/careers/{id}', [CarrerController::class, 'update']);
        Route::delete('/careers/{id}', [CarrerController::class, 'destroy']);
        Route::get('/job-applications', [CarrerController::class, 'jobApplication']);
    });


    Route::get('active-service-categories', [ServiceCategoryController::class, 'activeServiceCategories']);
    Route::get('active-services', [ServiceController::class, 'activeServices']);
});
