'use client';

import React, { useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormMessage } from '@/components/ui/form';
import SignatureCanvas from 'react-signature-canvas';

const signatureSchema = z.object({
  signature: z.string().min(1, 'Signature is required'),
});

type SignatureFormInputs = z.infer<typeof signatureSchema>;

interface SignatureFormProps {
  onSubmit: (signatureBytes: Uint8Array) => void;
}

const SignatureForm: React.FC<SignatureFormProps> = ({ onSubmit }) => {
  const signatureRef = useRef<SignatureCanvas>(null);

  const form = useForm<SignatureFormInputs>({
    resolver: zodResolver(signatureSchema),
  });

  const { handleSubmit, setValue, formState: { errors } } = form;

  const handleSignatureSubmit: SubmitHandler<SignatureFormInputs> = async (data) => {
    if (signatureRef.current) {
      const signatureDataURL = signatureRef.current.toDataURL('image/png');
      const base64Data = signatureDataURL.split(',')[1];
      const signatureBytes = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
      onSubmit(signatureBytes);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleSignatureSubmit)} className="flex flex-col gap-4">
        <div>
          <label>Signature:</label>
          <SignatureCanvas
            ref={signatureRef}
            canvasProps={{
              width: 500,
              height: 200,
              className: 'signature-canvas'
            }}
            onEnd={() => setValue('signature', 'signed', { shouldValidate: true })}
          />
          <Button
            type="button"
            onClick={() => {
              signatureRef.current?.clear();
              setValue('signature', '', { shouldValidate: true });
            }}

            className='mt-4'
          >
            Clear Signature
          </Button>
          {errors.signature && <FormMessage>{errors.signature.message}</FormMessage>}
        </div>

        <Button type="submit" className="mt-10 w-full">
          Submit Consent
        </Button>
      </form>
    </Form>
  );
};

export default SignatureForm;
