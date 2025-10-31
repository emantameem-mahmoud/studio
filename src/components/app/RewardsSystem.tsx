"use client";

import { useState } from 'react';
import { Cpu } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

const leaderboardData = {
  'الصف الأول': [
    { rank: 1, student: 'مريم', points: 1300, avatarId: 'avatar-1' },
    { rank: 2, student: 'عائشة', points: 1210, avatarId: 'avatar-2' },
    { rank: 3, student: 'زينب', points: 1050, avatarId: 'avatar-3' },
  ],
  'الصف الثاني': [
    { rank: 1, student: 'نورة', points: 1250, avatarId: 'avatar-1' },
    { rank: 2, student: 'فاطمة', points: 1100, avatarId: 'avatar-2' },
    { rank: 3, student: 'سارة', points: 980, avatarId: 'avatar-3' },
  ],
  'الصف الثالث': [
    { rank: 1, student: 'هند', points: 1400, avatarId: 'avatar-4' },
    { rank: 2, student: 'دانه', points: 1320, avatarId: 'avatar-1' },
    { rank: 3, student: 'شوق', points: 1150, avatarId: 'avatar-2' },
  ],
  'الصف الرابع': [
    { rank: 1, student: 'الجازي', points: 1550, avatarId: 'avatar-3' },
    { rank: 2, student: 'العنود', points: 1480, avatarId: 'avatar-4' },
    { rank: 3, student: 'منيرة', points: 1390, avatarId: 'avatar-1' },
  ],
  'الصف الخامس': [
    { rank: 1, student: 'حصة', points: 1620, avatarId: 'avatar-2' },
    { rank: 2, student: 'لولوة', points: 1540, avatarId: 'avatar-3' },
    { rank: 3, student: 'وضحى', points: 1470, avatarId: 'avatar-4' },
  ],
  'الصف السادس': [
    { rank: 1, student: 'شيخة', points: 1800, avatarId: 'avatar-1' },
    { rank: 2, student: 'موزة', points: 1750, avatarId: 'avatar-2' },
    { rank: 3, student: 'غالية', points: 1680, avatarId: 'avatar-3' },
  ],
};

const grades = [
  'الصف الأول',
  'الصف الثاني',
  'الصف الثالث',
  'الصف الرابع',
  'الصف الخامس',
  'الصف السادس',
];

export function RewardsSystem() {
  const [selectedGrade, setSelectedGrade] = useState<string>(grades[0]);

  const leaderboard = leaderboardData[selectedGrade as keyof typeof leaderboardData] || [];

  return (
    <section id="rewards">
      <Card className="shadow-lg h-full flex flex-col">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                <Cpu className="h-6 w-6 text-primary" />
            </div>
            <div>
                <CardTitle className="font-headline text-2xl">متفوقات قسم الحوسبة</CardTitle>
                <CardDescription>قائمة بأعلى الطالبات نقاطًا في مشاريع وأنشطة تكنولوجيا المعلومات.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {grades.map((grade) => (
              <Button
                key={grade}
                variant={selectedGrade === grade ? 'default' : 'outline'}
                onClick={() => setSelectedGrade(grade)}
                className={cn(
                  "transition-all",
                  selectedGrade === grade ? 'bg-primary text-primary-foreground' : 'bg-transparent'
                )}
              >
                {grade}
              </Button>
            ))}
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">الترتيب</TableHead>
                <TableHead>الطالبة</TableHead>
                <TableHead className="text-left">النقاط</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboard.map((player) => {
                 const avatar = PlaceHolderImages.find(img => img.id === player.avatarId);
                 return (
                    <TableRow key={player.rank} className={player.rank === 1 ? 'bg-accent/20' : ''}>
                        <TableCell className="font-bold text-lg">{player.rank}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <Avatar className="w-8 h-8">
                                    {avatar && (
                                        <AvatarImage src={avatar.imageUrl} alt={player.student} data-ai-hint={avatar.imageHint} />
                                    )}
                                    <AvatarFallback>{player.student.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{player.student}</span>
                            </div>
                        </TableCell>
                        <TableCell className="text-left font-bold text-primary">{player.points}</TableCell>
                    </TableRow>
                 )
              })}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Button className="w-full" disabled>
            استبدال النقاط قريباً
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
