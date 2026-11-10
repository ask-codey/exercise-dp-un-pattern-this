"""A demo: prints two gyms' schedules for the day. You don't need to change it."""
from schedule import Gym, GymClass

downtown = Gym("Downtown")
downtown.add_class(GymClass(12, "Spin", "Omar", "Bike room"))
downtown.add_class(GymClass(7, "Yoga", "Priya", "Studio A"))

north = Gym("North")
north.add_class(GymClass(18, "HIIT", "Omar", "Main floor"))

print("Downtown: " + "; ".join(downtown.schedule()))
print("North: " + "; ".join(north.schedule()))
print("Omar at Downtown: " + "; ".join(downtown.schedule_for("Omar")))
