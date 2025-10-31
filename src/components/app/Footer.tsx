export function Footer() {
  return (
    <footer className="mt-auto bg-card/50">
      <div className="container mx-auto py-4 px-4 text-sm text-muted-foreground">
        <div className="text-center mb-4">
          <p>&copy; {new Date().getFullYear()} مدرسة الشمال الابتدادية بنات. جميع الحقوق محفوظة.</p>
          <p className="font-semibold mt-2">رؤيتنا: متعلم ريادي، تنمية مستدامة</p>
        </div>
        <div className="flex justify-between items-center">
          <p>منسقة الحاسوب: زينب محمد</p>
          <p>إعداد:معلمة الحاسوب: إيمان محمود</p>
        </div>
      </div>
    </footer>
  );
}
