export function Footer() {
  return (
    <footer className="mt-auto bg-card/50">
      <div className="container mx-auto py-4 px-4 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} مدرسة الشمال الابتدائية بنات. جميع الحقوق محفوظة.</p>
        <p className="font-semibold mt-2">رؤيتنا: متعلم ريادي، تنمية مستدامة</p>
      </div>
    </footer>
  );
}
