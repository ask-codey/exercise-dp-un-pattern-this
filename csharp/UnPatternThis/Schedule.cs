namespace UnPatternThis;

// Summit Gym's daily schedule, as a teammate left it. Read the ticket in README.md first.

public record GymClass(int Hour, string Kind, string Instructor, string Room); // Hour: the start time, 0-23

// The one place every class is kept, so the whole app shares one schedule.
public class ScheduleRegistry
{
    private static ScheduleRegistry? instance;
    private ScheduleRegistry() { }
    public static ScheduleRegistry Instance => instance ??= new ScheduleRegistry();
    public List<GymClass> Classes { get; set; } = new List<GymClass>();
}

public interface IFormatter
{
    string Format(GymClass gymClass);
}

public class LineFormatter : IFormatter
{
    public string Format(GymClass gymClass) => $"{gymClass.Hour}:00 {gymClass.Kind} with {gymClass.Instructor}, {gymClass.Room}";
}

// Makes the formatter, so other formatters can be added later.
public class FormatterFactory
{
    public IFormatter CreateFormatter() => new LineFormatter();
}

// Hands out the formatter factory, so other factories can be added later.
public class FormatterFactoryProvider
{
    public FormatterFactory GetFactory() => new FormatterFactory();
}

public interface ISortStrategy
{
    List<GymClass> Sort(List<GymClass> classes);
}

// The sort strategy, so other orders can be added later.
public class ByStartTime : ISortStrategy
{
    public List<GymClass> Sort(List<GymClass> classes) => classes.OrderBy(gymClass => gymClass.Hour).ToList();
}

public class Gym
{
    public string Name { get; }

    public Gym(string name)
    {
        Name = name;
        // There's only one gym, so a new Gym starts the shared schedule over.
        ScheduleRegistry.Instance.Classes = new List<GymClass>();
    }

    public void AddClass(GymClass gymClass) => ScheduleRegistry.Instance.Classes.Add(gymClass);

    public List<string> Schedule()
    {
        IFormatter formatter = new FormatterFactoryProvider().GetFactory().CreateFormatter();
        ISortStrategy sorter = new ByStartTime();
        List<string> lines = sorter.Sort(ScheduleRegistry.Instance.Classes).Select(gymClass => formatter.Format(gymClass)).ToList();
        return lines.Count > 0 ? lines : new List<string> { "No classes today" };
    }

    // The instructors' app calls this with an instructor's name. It isn't built yet.
    public List<string> ScheduleFor(string instructor) => new List<string>();
}
