"""The tests for your code. You don't need to change this file.
Each message says what was expected, so a failing test tells you what to look at."""
from schedule import Gym, GymClass


def yoga():
    return GymClass(7, "Yoga", "Priya", "Studio A")


def spin():
    return GymClass(12, "Spin", "Omar", "Bike room")


def hiit():
    return GymClass(18, "HIIT", "Omar", "Main floor")


# What the schedule does today. These pass before you change anything: keep them passing.

def test_the_schedule_lists_classes_by_start_time():
    gym = Gym("Downtown")
    gym.add_class(hiit())
    gym.add_class(yoga())
    gym.add_class(spin())
    assert gym.schedule() == ["7:00 Yoga with Priya, Studio A", "12:00 Spin with Omar, Bike room", "18:00 HIIT with Omar, Main floor"], \
        "Keep this working: the schedule lists yoga at 7:00, spin at 12:00 and HIIT at 18:00, in that order."


def test_an_empty_day_says_so():
    assert Gym("Downtown").schedule() == ["No classes today"], 'Keep this working: a day with no classes says "No classes today".'


def test_a_class_added_later_takes_its_place_in_order():
    gym = Gym("Downtown")
    gym.add_class(yoga())
    gym.add_class(spin())
    gym.add_class(GymClass(9, "Pilates", "Priya", "Studio A"))
    assert gym.schedule()[1] == "9:00 Pilates with Priya, Studio A", "Keep this working: pilates at 9:00 comes second, between yoga and spin."


# The ticket's new requirements. These fail until the work is done.

def test_two_gyms_keep_their_own_schedules():
    downtown = Gym("Downtown")
    downtown.add_class(yoga())
    north = Gym("North")
    north.add_class(hiit())
    assert downtown.schedule() == ["7:00 Yoga with Priya, Studio A"], "Not yet: Downtown's schedule has only its own yoga class."
    assert north.schedule() == ["18:00 HIIT with Omar, Main floor"], "Not yet: North's schedule has only its own HIIT class."


def test_an_instructor_sees_only_their_own_classes():
    gym = Gym("Downtown")
    gym.add_class(hiit())
    gym.add_class(yoga())
    gym.add_class(spin())
    assert gym.schedule_for("Omar") == ["12:00 Spin with Omar, Bike room", "18:00 HIIT with Omar, Main floor"], \
        "Not yet: Omar's schedule has his spin and HIIT classes, in order."
    assert gym.schedule_for("Priya") == ["7:00 Yoga with Priya, Studio A"], "Not yet: Priya's schedule has her yoga class."
