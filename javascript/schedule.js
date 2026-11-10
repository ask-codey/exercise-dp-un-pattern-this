// Summit Gym's daily schedule, as a teammate left it. Read the ticket in README.md first.

export class GymClass {
  // hour: the start time, 0-23
  constructor(hour, kind, instructor, room) { this.hour = hour; this.kind = kind; this.instructor = instructor; this.room = room; }
}

// The one place every class is kept, so the whole app shares one schedule.
export class ScheduleRegistry {
  static #instance = null;
  classes = [];
  static instance() {
    if (ScheduleRegistry.#instance === null) { ScheduleRegistry.#instance = new ScheduleRegistry(); }
    return ScheduleRegistry.#instance;
  }
}

export class LineFormatter {
  format(gymClass) { return `${gymClass.hour}:00 ${gymClass.kind} with ${gymClass.instructor}, ${gymClass.room}`; }
}

// Makes the formatter, so other formatters can be added later.
export class FormatterFactory {
  createFormatter() { return new LineFormatter(); }
}

// Hands out the formatter factory, so other factories can be added later.
export class FormatterFactoryProvider {
  getFactory() { return new FormatterFactory(); }
}

// The sort strategy, so other orders can be added later.
export class ByStartTime {
  sort(classes) { return [...classes].sort((a, b) => a.hour - b.hour); }
}

export class Gym {
  constructor(name) {
    this.name = name;
    // There's only one gym, so a new Gym starts the shared schedule over.
    ScheduleRegistry.instance().classes = [];
  }

  addClass(gymClass) { ScheduleRegistry.instance().classes.push(gymClass); }

  schedule() {
    const formatter = new FormatterFactoryProvider().getFactory().createFormatter();
    const lines = new ByStartTime().sort(ScheduleRegistry.instance().classes).map((gymClass) => formatter.format(gymClass));
    return lines.length > 0 ? lines : ["No classes today"];
  }

  // The instructors' app calls this with an instructor's name. It isn't built yet.
  scheduleFor(instructor) {
    return [];
  }
}
