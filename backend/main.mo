import Array "mo:core/Array";
import List "mo:core/List";
import Text "mo:core/Text";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Int "mo:core/Int";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  public type HomepageContent = {
    heroTitle : Text;
    heroSubtitle : Text;
    heroImage : ?Storage.ExternalBlob;
    aboutText : Text;
    ctaText : Text;
  };

  let homepageContent : List.List<HomepageContent> = List.empty();

  let services = Map.empty<Text, Service>();

  public type Service = {
    id : Text;
    title : Text;
    description : Text;
    image : ?Storage.ExternalBlob;
  };

  public type Testimonial = {
    id : Int;
    customerName : Text;
    rating : Int;
    text : Text;
    image : ?Storage.ExternalBlob;
    service : Text;
    location : Text;
  };

  public type GalleryImage = {
    id : Int;
    beforeImage : Storage.ExternalBlob;
    afterImage : Storage.ExternalBlob;
    description : Text;
    service : Text;
    location : Text;
  };

  public type BookingRequest = {
    id : Int;
    name : Text;
    email : Text;
    phone : Text;
    serviceType : Text;
    location : Text;
    preferredDate : Text;
    message : Text;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
  };

  let testimonials = Map.empty<Int, Testimonial>();
  let galleryImages = Map.empty<Int, GalleryImage>();
  var nextId = 0;
  let bookingRequests = List.empty<BookingRequest>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  include MixinStorage();
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  module TestimonialModule {
    public func compareByRating(t1 : Testimonial, t2 : Testimonial) : Order.Order {
      Int.compare(t1.rating, t2.rating);
    };
  };

  // ── User profile functions (required by instructions) ──────────────────────

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get their profile");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // ── Public read functions (no auth required) ───────────────────────────────

  public query func getAllTestimonials() : async [Testimonial] {
    testimonials.values().toArray();
  };

  public query func getTestimonialsByRating() : async [Testimonial] {
    testimonials.values().toArray().sort(TestimonialModule.compareByRating);
  };

  public query func getAllGalleryImages() : async [GalleryImage] {
    galleryImages.values().toArray();
  };

  public query func getHomepageContent() : async HomepageContent {
    homepageContent.at(0);
  };

  public query func getAllServices() : async [Service] {
    services.values().toArray();
  };

  public query func getService(id : Text) : async ?Service {
    services.get(id);
  };

  // ── Booking submission (open to everyone including guests) ─────────────────

  public shared ({ caller }) func submitBookingRequest(request : BookingRequest) : async Int {
    // No auth check needed — guests can submit booking requests
    nextId += 1;
    let newRequest : BookingRequest = {
      id = nextId;
      name = request.name;
      email = request.email;
      phone = request.phone;
      serviceType = request.serviceType;
      location = request.location;
      preferredDate = request.preferredDate;
      message = request.message;
    };
    bookingRequests.add(newRequest);
    nextId;
  };

  // ── Admin-only: view booking requests ─────────────────────────────────────

  public query ({ caller }) func getAllBookingRequests() : async [BookingRequest] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view booking requests");
    };
    bookingRequests.toArray();
  };

  // ── Admin-only: homepage management ───────────────────────────────────────

  public shared ({ caller }) func updateHomepageContent(content : HomepageContent) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update homepage content");
    };
    homepageContent.clear();
    homepageContent.add(content);
  };

  // ── Admin-only: service management ────────────────────────────────────────

  public shared ({ caller }) func addService(id : Text, service : Service) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add services");
    };
    services.add(id, service);
  };

  public shared ({ caller }) func updateService(id : Text, service : Service) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update services");
    };
    services.add(id, service);
  };

  public shared ({ caller }) func removeService(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can remove services");
    };
    services.remove(id);
  };

  // ── Admin-only: testimonial management ────────────────────────────────────

  public shared ({ caller }) func addTestimonial(testimonial : Testimonial) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add testimonials");
    };
    testimonials.add(testimonial.id, testimonial);
  };

  public shared ({ caller }) func updateTestimonial(testimonial : Testimonial) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update testimonials");
    };
    testimonials.add(testimonial.id, testimonial);
  };

  public shared ({ caller }) func removeTestimonial(id : Int) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can remove testimonials");
    };
    testimonials.remove(id);
  };

  // ── Admin-only: gallery management ────────────────────────────────────────

  public shared ({ caller }) func addGalleryImage(galleryImage : GalleryImage) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add gallery images");
    };
    galleryImages.add(galleryImage.id, galleryImage);
  };

  public shared ({ caller }) func updateGalleryImage(galleryImage : GalleryImage) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update gallery images");
    };
    galleryImages.add(galleryImage.id, galleryImage);
  };

  public shared ({ caller }) func removeGalleryImage(id : Int) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can remove gallery images");
    };
    galleryImages.remove(id);
  };
};
