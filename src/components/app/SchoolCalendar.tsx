import { CalendarDays } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';

const events = [
    { date: '25', month: 'أكتوبر', title: 'اليوم المفتوح لأولياء الأمور' },
    { date: '10', month: 'نوفمبر', title: 'آخر موعد لتسليم مشاريع العلوم' },
    { date: '18', month: 'نوفمبر', title: 'رحلة مدرسية إلى المتحف الوطني' },
];

export function SchoolCalendar() {
  return (
    <section id="calendar">
        <Card className="shadow-lg h-full flex flex-col">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                        <CalendarDays className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="font-headline text-2xl">التقويم المدرسي</CardTitle>
                        <CardDescription>أهم الفعاليات والمواعيد القادمة.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col md:flex-row gap-6 items-start">
                <Calendar
                    mode="single"
                    selected={new Date()}
                    className="rounded-md border self-center"
                    dir="ltr"
                />
                <div className="flex-1 space-y-4 w-full">
                    <h3 className="font-semibold text-lg font-headline">فعاليات قادمة</h3>
                    {events.map((event, index) => (
                        <div key={index} className="flex items-start gap-4">
                            <div className="flex flex-col items-center justify-center w-12 bg-muted rounded-md p-1">
                                <span className="font-bold text-lg text-primary">{event.date}</span>
                                <span className="text-xs text-muted-foreground">{event.month}</span>
                            </div>
                            <p className="font-medium pt-1">{event.title}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
      </Card>
    </section>
  );
}
