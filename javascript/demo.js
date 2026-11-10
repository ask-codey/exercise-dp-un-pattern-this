// A demo: prints two gyms' schedules for the day. You don't need to change it.
import { Gym, GymClass } from "./schedule.js";

const downtown = new Gym("Downtown");
downtown.addClass(new GymClass(12, "Spin", "Omar", "Bike room"));
downtown.addClass(new GymClass(7, "Yoga", "Priya", "Studio A"));

const north = new Gym("North");
north.addClass(new GymClass(18, "HIIT", "Omar", "Main floor"));

console.log("Downtown: " + downtown.schedule().join("; "));
console.log("North: " + north.schedule().join("; "));
console.log("Omar at Downtown: " + downtown.scheduleFor("Omar").join("; "));
