import java.util.ArrayList;
import java.util.List;

// The one place every class is kept, so the whole app shares one schedule.
class ScheduleRegistry {
    private static ScheduleRegistry instance;
    List<GymClass> classes = new ArrayList<>();

    private ScheduleRegistry() { }

    static ScheduleRegistry instance() {
        if (instance == null) { instance = new ScheduleRegistry(); }
        return instance;
    }
}
