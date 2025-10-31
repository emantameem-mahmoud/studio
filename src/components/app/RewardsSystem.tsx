"use client";

import { useState } from 'react';
import { Award, Edit, Save } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

const initialLeaderboardData = {
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
  { name: 'الصف الأول', color: 'bg-blue-200 hover:bg-blue-300', textColor: 'text-blue-800'},
  { name: 'الصف الثاني', color: 'bg-green-200 hover:bg-green-300', textColor: 'text-green-800' },
  { name: 'الصف الثالث', color: 'bg-yellow-200 hover:bg-yellow-300', textColor: 'text-yellow-800' },
  { name: 'الصف الرابع', color: 'bg-purple-200 hover:bg-purple-300', textColor: 'text-purple-800' },
  { name: 'الصف الخامس', color: 'bg-pink-200 hover:bg-pink-300', textColor: 'text-pink-800' },
  { name: 'الصف السادس', color: 'bg-indigo-200 hover:bg-indigo-300', textColor: 'text-indigo-800' },
];

export function RewardsSystem() {
  const [selectedGrade, setSelectedGrade] = useState<string>(grades[0].name);
  const [leaderboardData, setLeaderboardData] = useState(initialLeaderboardData);
  const [isEditing, setIsEditing] = useState(false);

  const handleNameChange = (grade: string, rank: number, newName: string) => {
    setLeaderboardData(prevState => {
      const newState = { ...prevState };
      const gradeKey = grade as keyof typeof prevState;
      const gradeData = [...newState[gradeKey]];
      const studentIndex = gradeData.findIndex(s => s.rank === rank);
      if (studentIndex !== -1) {
        gradeData[studentIndex] = { ...gradeData[studentIndex], student: newName };
        return { ...newState, [gradeKey]: gradeData };
      }
      return newState;
    });
  };

  const leaderboard = leaderboardData[selectedGrade as keyof typeof leaderboardData] || [];

  return (
    <section id="rewards">
      <Card className="shadow-lg h-full flex flex-col">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                  <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                  <CardTitle className="font-headline text-2xl">متفوقات قسم الحوسبة</CardTitle>
                  <CardDescription>قائمة بأعلى الطالبات نقاطًا في مشاريع وأنشطة تكنولوجيا المعلومات.</CardDescription>
              </div>
            </div>
            <Button variant="outline" size="icon" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
              <span className="sr-only">{isEditing ? 'حفظ' : 'تعديل'}</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {grades.map((grade) => (
              <Button
                key={grade.name}
                variant={selectedGrade === grade.name ? 'default' : 'outline'}
                onClick={() => setSelectedGrade(grade.name)}
                className={cn(
                  "transition-all",
                  selectedGrade === grade.name
                    ? 'bg-primary text-primary-foreground'
                    : `${grade.color} ${grade.textColor} border-transparent`
                )}
              >
                {grade.name}
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
                                {isEditing ? (
                                  <Input 
                                    type="text"
                                    value={player.student}
                                    onChange={(e) => handleNameChange(selectedGrade, player.rank, e.target.value)}
                                    className="h-8"
                                  />
                                ) : (
                                  <span className="font-medium">{player.student}</span>
                                )}
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
