class LineFormatter implements Formatter {
    public String format(GymClass gymClass) {
        return gymClass.hour() + ":00 " + gymClass.kind() + " with " + gymClass.instructor() + ", " + gymClass.room();
    }
}
