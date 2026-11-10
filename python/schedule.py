"""Summit Gym's daily schedule, as a teammate left it. Read the ticket in README.md first."""


class GymClass:
    def __init__(self, hour, kind, instructor, room):
        self.hour = hour  # the start time, 0-23
        self.kind = kind
        self.instructor = instructor
        self.room = room


class ScheduleRegistry:
    """The one place every class is kept, so the whole app shares one schedule."""

    _instance = None

    def __init__(self):
        self.classes = []

    @classmethod
    def instance(cls):
        if cls._instance is None:
            cls._instance = ScheduleRegistry()
        return cls._instance


class LineFormatter:
    def format(self, gym_class):
        return f"{gym_class.hour}:00 {gym_class.kind} with {gym_class.instructor}, {gym_class.room}"


class FormatterFactory:
    """Makes the formatter, so other formatters can be added later."""

    def create_formatter(self):
        return LineFormatter()


class FormatterFactoryProvider:
    """Hands out the formatter factory, so other factories can be added later."""

    def get_factory(self):
        return FormatterFactory()


class ByStartTime:
    """The sort strategy, so other orders can be added later."""

    def sort(self, classes):
        return sorted(classes, key=lambda gym_class: gym_class.hour)


class Gym:
    def __init__(self, name):
        self.name = name
        # There's only one gym, so a new Gym starts the shared schedule over.
        ScheduleRegistry.instance().classes.clear()

    def add_class(self, gym_class):
        ScheduleRegistry.instance().classes.append(gym_class)

    def schedule(self):
        formatter = FormatterFactoryProvider().get_factory().create_formatter()
        lines = [formatter.format(gym_class) for gym_class in ByStartTime().sort(ScheduleRegistry.instance().classes)]
        return lines if lines else ["No classes today"]

    def schedule_for(self, instructor):
        """The instructors' app calls this with an instructor's name. It isn't built yet."""
        return []
