"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Cpu, Bot, Printer, Award, Edit, Save } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SectionTitle } from './SectionTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const initialItAchievements = [
  {
    title: 'تطوير تطبيق مدرسي',
    description: 'فريق من الطالبات يطور تطبيقاً لتنظيم الفعاليات المدرسية.',
    category: 'البرمجة',
    icon: Cpu,
    image: PlaceHolderImages.find(img => img.id === 'it-1'),
  },
  {
    title: 'الفوز بمسابقة الروبوت',
    description: 'تصميم وبرمجة روبوت ذكي لتنفيذ مهام معقدة والفوز بالمركز الأول.',
    category: 'الروبوتات',
    icon: Bot,
    image: PlaceHolderImages.find(img => img.id === 'it-2'),
  },
  {
    title: 'مشروع الطباعة ثلاثية الأبعاد',
    description: 'استخدام الطباعة ثلاثية الأبعاد لإنشاء نماذج تعليمية مبتكرة.',
    category: 'الابتكار',
    icon: Printer,
    image: PlaceHolderImages.find(img => img.id === 'it-3'),
  },
];

export function ITShowcase() {
  const [achievements, setAchievements] = useState(initialItAchievements);
  const [isEditing, setIsEditing] = useState(false);

  const handleFieldChange = (index: number, field: string, value: string) => {
    const updatedAchievements = [...achievements];
    const achievement = updatedAchievements[index] as any;
    
    if (field === 'imageUrl' && achievement.image) {
        achievement.image.imageUrl = value;
    } else {
        achievement[field] = value;
    }
    setAchievements(updatedAchievements);
  };

  return (
    <section id="it-achievements">
      <div className="flex flex-col items-center text-center mb-8 md:mb-12">
        <div className="flex items-center justify-between w-full">
            <div className="flex-grow"></div>
            <div className="flex-grow-[2]">
                <SectionTitle
                    icon={Award}
                    title="إنجازات الحوسبة وتكنولوجيا المعلومات"
                    subtitle="نستعرض هنا أبرز مشاريع وإبداعات طالباتنا في المجال التقني."
                    className="mb-0"
                />
            </div>
            <div className="flex-grow text-left">
                <Button variant="outline" size="icon" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                    <span className="sr-only">{isEditing ? 'حفظ' : 'تعديل'}</span>
                </Button>
            </div>
        </div>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
        {achievements.map((achievement, index) => (
          <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
            {achievement.image && (
              <div className="relative h-48 w-full">
                <Image
                  src={achievement.image.imageUrl}
                  alt={achievement.image.description}
                  fill
                  className="object-cover"
                  data-ai-hint={achievement.image.imageHint}
                />
              </div>
            )}
             {isEditing && achievement.image && (
                <div className="p-2">
                    <Input
                        type="text"
                        placeholder="Image URL"
                        value={achievement.image.imageUrl}
                        onChange={(e) => handleFieldChange(index, 'imageUrl', e.target.value)}
                        className="h-8 text-xs"
                    />
                </div>
            )}
            <CardHeader>
                {isEditing ? (
                     <Input
                        type="text"
                        value={achievement.title}
                        onChange={(e) => handleFieldChange(index, 'title', e.target.value)}
                        className="font-headline text-xl"
                    />
                ) : (
                    <CardTitle className="font-headline text-xl">{achievement.title}</CardTitle>
                )}
            </CardHeader>
            <CardContent className="flex-grow">
                 {isEditing ? (
                    <Textarea
                        value={achievement.description}
                        onChange={(e) => handleFieldChange(index, 'description', e.target.value)}
                        rows={3}
                    />
                ) : (
                    <CardDescription>{achievement.description}</CardDescription>
                )}
            </CardContent>
            <CardFooter>
              <Badge variant="secondary" className="bg-primary/20 text-primary-foreground">{achievement.category}</Badge>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}