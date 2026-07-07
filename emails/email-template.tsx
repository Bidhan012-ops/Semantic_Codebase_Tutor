import * as React from 'react';

interface EmailTemplateProps {
  username: string;
  varifyCode: string;
}

export function EmailTemplate({ username, varifyCode }: EmailTemplateProps) {
  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <h1>thank you for joining our family!</h1>
      <p>Your verification code is: {varifyCode}</p>
    </div>
  );
}