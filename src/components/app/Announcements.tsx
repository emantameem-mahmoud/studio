"use client";

import { useState } from 'react';
import { Megaphone, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useEditMode } from '@/context/EditModeContext';

const initialAnnouncements = [
  'سيتم عقد ورشة عمل حول الذكاء الاصطناعي يوم الأربعاء المقبل.',
  'الرجاء من جميع الطالبات المشاركات في مسابقة الروبوت تسليم مشاريعهن قبل نهاية الأسبوع.',
  'تذكير: آخر موعد للتسجيل في نادي البرمجة هو يوم الخميس.',
];

export function Announcements() {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const { isEditing } = useEditMode();
  const [editText, setEditText] = useState(announcements.join('\n'));

  const handleSave = () => {
    setAnnouncements(editText.split('\n').filter(line => line.trim() !== ''));
  };

  return (
    <section id="announcements">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent/10">
                <Megaphone className="h-6 w-6 text-accent" />
              </div>
              <div>
                <CardTitle className="font-headline text-2xl">لوحة الإعلانات</CardTitle>
                <CardDescription>آخر الأخبار والتحديثات الخاصة بقسم الحوسبة.</CardDescription>
              </div>
            </div>
            {isEditing && (
                <Button variant="outline" size="icon" onClick={handleSave}>
                    <Save className="h-4 w-4" />
                    <span className="sr-only">حفظ</span>
                </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              rows={5}
              className="w-full text-base"
            />
          ) : (
            <ul className="space-y-3 list-disc list-inside text-foreground/90">
              {announcements.map((announcement, index) => (
                <li key={index}>{announcement}</li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
