function require(s) {
  switch (s) {
    case 'chai':
      return chai;
    case '../':
      return CurryArity;
  }
}
