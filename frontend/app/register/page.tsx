'use client';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function RegisterPage() {
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // ✅ ตรวจสอบว่ารหัสผ่านตรงกันก่อนสมัคร
  const onSubmit = async (data: any) => {
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match');
      setSuccess('');
      return;
    }

    try {
      await axios.post('http://localhost:3000/auth/register', {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      setSuccess('Registration successful! Redirecting to login...');
      setError('');
      setTimeout(() => router.push('/login'), 1500);
    } catch (err: any) {
      setError('Email already exists or invalid data');
      setSuccess('');
      reset();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-slate-100 to-blue-100 dark:from-zinc-900 dark:to-black font-sans">
      <Card className="w-[380px] p-6 shadow-2xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-2xl">
        <CardHeader className="flex flex-col items-center text-center">
          {/* <Image
            src="/vizzeltrack-logo.svg" // 🟦 โลโก้ (ใช้ไฟล์เดียวกับหน้า Home / Login)
            alt="VizzelTrack logo"
            width={60}
            height={60}
            className="mb-3 dark:invert"
          /> */}
          <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Create Your Account
          </CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Join <span className="font-medium text-blue-600">VizzelTrack</span> today
          </p>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            spellCheck="false"
            className="space-y-4"
          >
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                {...register('name')}
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                required
                autoComplete="name"
                className="bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register('email')}
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                {...register('password')}
                id="password"
                name="password"
                type="password"
                placeholder="********"
                required
                autoComplete="new-password"
                className="bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700"
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                {...register('confirmPassword')}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="********"
                required
                autoComplete="new-password"
                className="bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700"
              />
            </div>

            {/* Error / Success */}
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {success && <p className="text-green-600 text-sm text-center">{success}</p>}

            {/* Submit */}
            <Button
              type="submit"
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white transition-all hover:scale-[1.02]"
            >
              Sign Up
            </Button>

            {/* Redirect to login */}
            <p className="text-center text-sm mt-4 text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 hover:underline">
                Sign in
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
