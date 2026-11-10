import java.util.Comparator;
import java.util.List;

// The sort strategy, so other orders can be added later.
class ByStartTime implements SortStrategy {
    public List<GymClass> sort(List<GymClass> classes) {
        return classes.stream().sorted(Comparator.comparingInt(GymClass::hour)).toList();
    }
}
