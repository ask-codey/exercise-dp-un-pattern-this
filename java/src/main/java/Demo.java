// A demo: prints two gyms' schedules for the day. You don't need to change it.
// Run it with: java src/main/java/Demo.java
public class Demo {
    public static void main(String[] args) {
        Gym downtown = new Gym("Downtown");
        downtown.addClass(new GymClass(12, "Spin", "Omar", "Bike room"));
        downtown.addClass(new GymClass(7, "Yoga", "Priya", "Studio A"));

        Gym north = new Gym("North");
        north.addClass(new GymClass(18, "HIIT", "Omar", "Main floor"));

        System.out.println("Downtown: " + String.join("; ", downtown.schedule()));
        System.out.println("North: " + String.join("; ", north.schedule()));
        System.out.println("Omar at Downtown: " + String.join("; ", downtown.scheduleFor("Omar")));
    }
}
