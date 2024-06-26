import { Table } from '@/@/components/ui/table';
import { ConsentFormTable } from './consetFormTable';
import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { ConsentForm, Prisma } from '@prisma/client';


export const metadata = {
  title: 'Consent Forms',
  description: 'View consent form details.'
};

async function getConsentForms() {
  const consentForm: ConsentForm[]  = await prisma.consentForm.findMany();

  if (!consentForm) {
    notFound();
  }

  return consentForm;
}

const ConsentFormsPage = async () => {
  const consentForms: ConsentForm[] = await getConsentForms();

  return (
    <main className="flex flex-1 flex-col p-4 md:p-6">
      <div className="flex items-center mb-8">
        <h1 className="font-semibold text-lg md:text-2xl">Consent Forms</h1>
      </div>
      <ConsentFormTable offset={null} consentForms={consentForms} />
    </main>
  );
};

export default ConsentFormsPage;
