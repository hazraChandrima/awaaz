import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { phoneNumber } = await request.json();

    if (!phoneNumber) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    if (phoneNumber) {
      const phoneRegex = /^\+[1-9]\d{1,14}$/;
      if (!phoneRegex.test(phoneNumber)) {
        return NextResponse.json(
          { error: 'Invalid phone number format. Please use international format (e.g., +1234567890)' },
          { status: 400 }
        );
      }

      const fast2smsUrl = new URL('https://www.fast2sms.com/dev/bulkV2');
      fast2smsUrl.searchParams.append('authorization', process.env.FAST2SMS_API_KEY!);
      fast2smsUrl.searchParams.append('message', `Your verification code is: ${otp}`);
      fast2smsUrl.searchParams.append('language', 'english');
      fast2smsUrl.searchParams.append('route', 'q');
      fast2smsUrl.searchParams.append('numbers', phoneNumber.replace(/^\+91/, ''));

      const response = await fetch(fast2smsUrl.toString(), {
        method: 'GET',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to send OTP via Fast2SMS: ${errorData.message || 'Unknown error'}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully',
      otp, 
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to send OTP' },
      { status: 500 }
    );
  }
}