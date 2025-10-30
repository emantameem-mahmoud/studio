import Image from 'next/image';
import { Gift } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { SectionTitle } from './SectionTitle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const messages = [
  { student: 'نورة', message: 'مبارك تفوقك في مادة الرياضيات، استمري في التألق!', avatarId: 'avatar-1' },
  { student: 'فاطمة', message: 'أبدعتِ في مشروع اللغة العربية، خطك جميل وأفكارك رائعة.', avatarId: 'avatar-2' },
  { student: 'سارة', message: 'شكراً لمساعدتك زميلاتك في الفصل، أنتِ مثال للتعاون.', avatarId: 'avatar-3' },
  { student: 'علياء', message: 'لقد أظهرتِ تحسناً كبيراً هذا الشهر، نحن فخورون بكِ!', avatarId: 'avatar-4' },
];

export function PersonalizedMessages() {
  return (
    <section id="messages" className="w-full">
      <SectionTitle
        icon={Gift}
        title="رسائل تهنئة خاصة"
        subtitle="كلمات تشجيعية لطالباتنا المتألقات على جهودهن المميزة."
      />
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-4xl mx-auto"
      >
        <CarouselContent>
          {messages.map((item, index) => {
            const avatar = PlaceHolderImages.find(img => img.id === item.avatarId);
            return (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="shadow-lg">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <Avatar className="w-20 h-20 mb-4 border-4 border-accent">
                        {avatar && (
                           <AvatarImage src={avatar.imageUrl} alt={item.student} data-ai-hint={avatar.imageHint} />
                        )}
                        <AvatarFallback>{item.student.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-headline font-bold text-lg">{item.student}</h3>
                      <p className="text-muted-foreground mt-2">&quot;{item.message}&quot;</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </section>
  );
}
