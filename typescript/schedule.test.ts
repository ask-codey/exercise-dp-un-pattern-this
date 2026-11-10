// The tests for your code. You don't need to change this file.
// Each message says what was expected, so a failing test tells you what to look at.
import assert from "node:assert/strict";
import { test } from "node:test";
import { Gym, GymClass } from "./schedule.ts";

const yoga = (): GymClass => new GymClass(7, "Yoga", "Priya", "Studio A");
const spin = (): GymClass => new GymClass(12, "Spin", "Omar", "Bike room");
const hiit = (): GymClass => new GymClass(18, "HIIT", "Omar", "Main floor");

// What the schedule does today. These pass before you change anything: keep them passing.

test("the schedule lists classes by start time", () => {
  const gym = new Gym("Downtown");
  gym.addClass(hiit());
  gym.addClass(yoga());
  gym.addClass(spin());
  assert.deepEqual(gym.schedule(), ["7:00 Yoga with Priya, Studio A", "12:00 Spin with Omar, Bike room", "18:00 HIIT with Omar, Main floor"], "Keep this working: the schedule lists yoga at 7:00, spin at 12:00 and HIIT at 18:00, in that order.");
});

test("an empty day says so", () => {
  assert.deepEqual(new Gym("Downtown").schedule(), ["No classes today"], 'Keep this working: a day with no classes says "No classes today".');
});

test("a class added later takes its place in order", () => {
  const gym = new Gym("Downtown");
  gym.addClass(yoga());
  gym.addClass(spin());
  gym.addClass(new GymClass(9, "Pilates", "Priya", "Studio A"));
  assert.equal(gym.schedule()[1], "9:00 Pilates with Priya, Studio A", "Keep this working: pilates at 9:00 comes second, between yoga and spin.");
});

// The ticket's new requirements. These fail until the work is done.

test("two gyms keep their own schedules", () => {
  const downtown = new Gym("Downtown");
  downtown.addClass(yoga());
  const north = new Gym("North");
  north.addClass(hiit());
  assert.deepEqual(downtown.schedule(), ["7:00 Yoga with Priya, Studio A"], "Not yet: Downtown's schedule has only its own yoga class.");
  assert.deepEqual(north.schedule(), ["18:00 HIIT with Omar, Main floor"], "Not yet: North's schedule has only its own HIIT class.");
});

test("an instructor sees only their own classes", () => {
  const gym = new Gym("Downtown");
  gym.addClass(hiit());
  gym.addClass(yoga());
  gym.addClass(spin());
  assert.deepEqual(gym.scheduleFor("Omar"), ["12:00 Spin with Omar, Bike room", "18:00 HIIT with Omar, Main floor"], "Not yet: Omar's schedule has his spin and HIIT classes, in order.");
  assert.deepEqual(gym.scheduleFor("Priya"), ["7:00 Yoga with Priya, Studio A"], "Not yet: Priya's schedule has her yoga class.");
});
