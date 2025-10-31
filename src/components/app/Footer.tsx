export function Footer() {
  return (
    <footer className="mt-auto bg-card/50">
      <div className="container mx-auto py-4 px-4 text-sm text-muted-foreground">
        <div className="flex justify-between items-center mb-4">
          <div className="w-1/4"></div>
          <div className="text-center flex-grow">
            <p className="font-semibold mt-2">رؤيتنا: متعلم ريادي، تنمية مستدامة</p>
          </div>
          <div className="text-right">
            <p className="text-base font-medium">مديرة المدرسة: مريم مبارك الحسيني</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p>منسقة الحاسوب: زينب محمد</p>
          <p>إعداد: معلمة الحاسوب: إيمان محمود</p>
        </div>
      </div>
    </footer>
  );
}
