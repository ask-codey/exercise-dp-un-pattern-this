import java.util.ArrayList;
import java.util.List;

// Summit Gym's daily schedule, as a teammate left it. Read the ticket in README.md first.
class Gym {
    final String name;

    Gym(String name) {
        this.name = name;
        // There's only one gym, so a new Gym starts the shared schedule over.
        ScheduleRegistry.instance().classes = new ArrayList<>();
    }

    void addClass(GymClass gymClass) { ScheduleRegistry.instance().classes.add(gymClass); }

    List<String> schedule() {
        Formatter formatter = new FormatterFactoryProvider().getFactory().createFormatter();
        SortStrategy sorter = new ByStartTime();
        List<String> lines = sorter.sort(ScheduleRegistry.instance().classes).stream().map(formatter::format).toList();
        return lines.isEmpty() ? List.of("No classes today") : lines;
    }

    // The instructors' app calls this with an instructor's name. It isn't built yet.
    List<String> scheduleFor(String instructor) {
        return List.of();
    }
}
