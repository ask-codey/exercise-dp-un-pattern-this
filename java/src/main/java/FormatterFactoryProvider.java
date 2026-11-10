// Hands out the formatter factory, so other factories can be added later.
class FormatterFactoryProvider {
    FormatterFactory getFactory() { return new FormatterFactory(); }
}
