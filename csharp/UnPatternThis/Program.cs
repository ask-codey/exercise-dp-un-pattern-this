using UnPatternThis;

// A demo: prints two gyms' schedules for the day. You don't need to change it.
Gym downtown = new Gym("Downtown");
downtown.AddClass(new GymClass(12, "Spin", "Omar", "Bike room"));
downtown.AddClass(new GymClass(7, "Yoga", "Priya", "Studio A"));

Gym north = new Gym("North");
north.AddClass(new GymClass(18, "HIIT", "Omar", "Main floor"));

Console.WriteLine("Downtown: " + string.Join("; ", downtown.Schedule()));
Console.WriteLine("North: " + string.Join("; ", north.Schedule()));
Console.WriteLine("Omar at Downtown: " + string.Join("; ", downtown.ScheduleFor("Omar")));
