using UnPatternThis;

namespace UnPatternThis.Tests;

// The tests for your code. You don't need to change this file.
// Each message says what was expected, so a failing test tells you what to look at.

[TestClass]
public class ScheduleTests
{
    private static GymClass Yoga() => new GymClass(7, "Yoga", "Priya", "Studio A");
    private static GymClass Spin() => new GymClass(12, "Spin", "Omar", "Bike room");
    private static GymClass Hiit() => new GymClass(18, "HIIT", "Omar", "Main floor");

    // What the schedule does today. These pass before you change anything: keep them passing.

    [TestMethod]
    public void TheScheduleListsClassesByStartTime()
    {
        Gym gym = new Gym("Downtown");
        gym.AddClass(Hiit());
        gym.AddClass(Yoga());
        gym.AddClass(Spin());
        CollectionAssert.AreEqual(new List<string> { "7:00 Yoga with Priya, Studio A", "12:00 Spin with Omar, Bike room", "18:00 HIIT with Omar, Main floor" }, gym.Schedule(), "Keep this working: the schedule lists yoga at 7:00, spin at 12:00 and HIIT at 18:00, in that order.");
    }

    [TestMethod]
    public void AnEmptyDaySaysSo()
    {
        CollectionAssert.AreEqual(new List<string> { "No classes today" }, new Gym("Downtown").Schedule(), "Keep this working: a day with no classes says \"No classes today\".");
    }

    [TestMethod]
    public void AClassAddedLaterTakesItsPlaceInOrder()
    {
        Gym gym = new Gym("Downtown");
        gym.AddClass(Yoga());
        gym.AddClass(Spin());
        gym.AddClass(new GymClass(9, "Pilates", "Priya", "Studio A"));
        Assert.AreEqual("9:00 Pilates with Priya, Studio A", gym.Schedule()[1], "Keep this working: pilates at 9:00 comes second, between yoga and spin.");
    }

    // The ticket's new requirements. These fail until the work is done.

    [TestMethod]
    public void TwoGymsKeepTheirOwnSchedules()
    {
        Gym downtown = new Gym("Downtown");
        downtown.AddClass(Yoga());
        Gym north = new Gym("North");
        north.AddClass(Hiit());
        CollectionAssert.AreEqual(new List<string> { "7:00 Yoga with Priya, Studio A" }, downtown.Schedule(), "Not yet: Downtown's schedule has only its own yoga class.");
        CollectionAssert.AreEqual(new List<string> { "18:00 HIIT with Omar, Main floor" }, north.Schedule(), "Not yet: North's schedule has only its own HIIT class.");
    }

    [TestMethod]
    public void AnInstructorSeesOnlyTheirOwnClasses()
    {
        Gym gym = new Gym("Downtown");
        gym.AddClass(Hiit());
        gym.AddClass(Yoga());
        gym.AddClass(Spin());
        CollectionAssert.AreEqual(new List<string> { "12:00 Spin with Omar, Bike room", "18:00 HIIT with Omar, Main floor" }, gym.ScheduleFor("Omar"), "Not yet: Omar's schedule has his spin and HIIT classes, in order.");
        CollectionAssert.AreEqual(new List<string> { "7:00 Yoga with Priya, Studio A" }, gym.ScheduleFor("Priya"), "Not yet: Priya's schedule has her yoga class.");
    }
}
