// Summit Gym's daily schedule, as a teammate left it. Read the ticket in README.md first.

export class GymClass {
  hour: number; // the start time, 0-23
  kind: string;
  instructor: string;
  room: string;
  constructor(hour: number, kind: string, instructor: string, room: string) { this.hour = hour; this.kind = kind; this.instructor = instructor; this.room = room; }
}

// The one place every class is kept, so the whole app shares one schedule.
export class ScheduleRegistry {
  private static current: ScheduleRegistry | null = null;
  classes: GymClass[] = [];
  static instance(): ScheduleRegistry {
    if (ScheduleRegistry.current === null) { ScheduleRegistry.current = new ScheduleRegistry(); }
    return ScheduleRegistry.current;
  }
}

export interface Formatter {
  format(gymClass: GymClass): string;
}

export class LineFormatter implements Formatter {
  format(gymClass: GymClass): string { return `${gymClass.hour}:00 ${gymClass.kind} with ${gymClass.instructor}, ${gymClass.room}`; }
}

// Makes the formatter, so other formatters can be added later.
export class FormatterFactory {
  createFormatter(): Formatter { return new LineFormatter(); }
}

// Hands out the formatter factory, so other factories can be added later.
export class FormatterFactoryProvider {
  getFactory(): FormatterFactory { return new FormatterFactory(); }
}

export interface SortStrategy {
  sort(classes: GymClass[]): GymClass[];
}

// The sort strategy, so other orders can be added later.
export class ByStartTime implements SortStrategy {
  sort(classes: GymClass[]): GymClass[] { return [...classes].sort((a, b) => a.hour - b.hour); }
}

export class Gym {
  name: string;

  constructor(name: string) {
    this.name = name;
    // There's only one gym, so a new Gym starts the shared schedule over.
    ScheduleRegistry.instance().classes = [];
  }

  addClass(gymClass: GymClass): void { ScheduleRegistry.instance().classes.push(gymClass); }

  schedule(): string[] {
    const formatter = new FormatterFactoryProvider().getFactory().createFormatter();
    const sorter: SortStrategy = new ByStartTime();
    const lines = sorter.sort(ScheduleRegistry.instance().classes).map((gymClass) => formatter.format(gymClass));
    return lines.length > 0 ? lines : ["No classes today"];
  }

  // The instructors' app calls this with an instructor's name. It isn't built yet.
  scheduleFor(instructor: string): string[] {
    return [];
  }
}
