import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;
import org.junit.jupiter.api.Test;

// The tests for your code. You don't need to change this file.
// Each message says what was expected, so a failing test tells you what to look at.
class ScheduleTest {
    private static GymClass yoga() { return new GymClass(7, "Yoga", "Priya", "Studio A"); }
    private static GymClass spin() { return new GymClass(12, "Spin", "Omar", "Bike room"); }
    private static GymClass hiit() { return new GymClass(18, "HIIT", "Omar", "Main floor"); }

    // What the schedule does today. These pass before you change anything: keep them passing.

    @Test
    void theScheduleListsClassesByStartTime() {
        Gym gym = new Gym("Downtown");
        gym.addClass(hiit());
        gym.addClass(yoga());
        gym.addClass(spin());
        assertEquals(List.of("7:00 Yoga with Priya, Studio A", "12:00 Spin with Omar, Bike room", "18:00 HIIT with Omar, Main floor"), gym.schedule(), "Keep this working: the schedule lists yoga at 7:00, spin at 12:00 and HIIT at 18:00, in that order.");
    }

    @Test
    void anEmptyDaySaysSo() {
        assertEquals(List.of("No classes today"), new Gym("Downtown").schedule(), "Keep this working: a day with no classes says \"No classes today\".");
    }

    @Test
    void aClassAddedLaterTakesItsPlaceInOrder() {
        Gym gym = new Gym("Downtown");
        gym.addClass(yoga());
        gym.addClass(spin());
        gym.addClass(new GymClass(9, "Pilates", "Priya", "Studio A"));
        assertEquals("9:00 Pilates with Priya, Studio A", gym.schedule().get(1), "Keep this working: pilates at 9:00 comes second, between yoga and spin.");
    }

    // The ticket's new requirements. These fail until the work is done.

    @Test
    void twoGymsKeepTheirOwnSchedules() {
        Gym downtown = new Gym("Downtown");
        downtown.addClass(yoga());
        Gym north = new Gym("North");
        north.addClass(hiit());
        assertEquals(List.of("7:00 Yoga with Priya, Studio A"), downtown.schedule(), "Not yet: Downtown's schedule has only its own yoga class.");
        assertEquals(List.of("18:00 HIIT with Omar, Main floor"), north.schedule(), "Not yet: North's schedule has only its own HIIT class.");
    }

    @Test
    void anInstructorSeesOnlyTheirOwnClasses() {
        Gym gym = new Gym("Downtown");
        gym.addClass(hiit());
        gym.addClass(yoga());
        gym.addClass(spin());
        assertEquals(List.of("12:00 Spin with Omar, Bike room", "18:00 HIIT with Omar, Main floor"), gym.scheduleFor("Omar"), "Not yet: Omar's schedule has his spin and HIIT classes, in order.");
        assertEquals(List.of("7:00 Yoga with Priya, Studio A"), gym.scheduleFor("Priya"), "Not yet: Priya's schedule has her yoga class.");
    }
}
