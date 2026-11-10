// Makes the formatter, so other formatters can be added later.
class FormatterFactory {
    Formatter createFormatter() { return new LineFormatter(); }
}
