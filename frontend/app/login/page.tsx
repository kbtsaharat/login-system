'use client';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [error, setError] = useState('');

  const onSubmit = async (data: any) => {
    try {
      const res = await axios.post('http://localhost:3000/auth/login', data);
      localStorage.setItem('token', res.data.access_token);
      router.push('/dashboard');
    } catch (err: any) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-200">
      <Card className="w-[360px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Sign In
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register('email')}
                id="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                {...register('password')}
                id="password"
                type="password"
                placeholder="********"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              type="submit"
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
