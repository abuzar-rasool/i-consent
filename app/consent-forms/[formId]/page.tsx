import prisma from '@/lib/prisma';
import { ConsentForm } from '@prisma/client';
import { notFound } from 'next/navigation';
import ConsentFormDisplay from './consentFormDisplay';


const FormPage = async ({ params }: { params: { formId: string } }) => {
  const consentForm: ConsentForm | null = await prisma.consentForm.findFirst({
    where: {
      id: params.formId
    }
  });

  if (!consentForm) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col p-4 md:p-6">
    <ConsentFormDisplay consentForm={consentForm} />
    </main>
  );
};

export default FormPage;
