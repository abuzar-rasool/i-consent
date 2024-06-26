'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ConsentForm } from '@prisma/client';
import Link from 'next/link';

export function ConsentFormTable({
  consentForms,
  offset
}: {
  consentForms: ConsentForm[];
  offset: number | null;
}) {
  const router = useRouter();

  function goToCreateConsentForm() {
    router.push('/consent-forms/create');
  }

  function onClick() {
    router.replace(`/?offset=${offset}`);
  }

  // Group consent forms by study code
  const groupedForms = consentForms.reduce((acc, form) => {
    if (!form.studyCode) {
      form.studyCode = 'N/A';
    }
    if (!acc[form.studyCode]) {
      acc[form.studyCode] = [];
    }
    acc[form.studyCode].push(form);
    return acc;
  }, {} as Record<string, ConsentForm[]>);

  return (
    <>
      <div className="flex items-center gap-4 mb-4">
        <Button
          className="mt-4 w-40"
          variant="secondary"
          onClick={() => goToCreateConsentForm()}
        >
          Create new
        </Button>
      </div>
      <Table className="border shadow-sm rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead>Study Code</TableHead>
            <TableHead>Distribution Link</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(groupedForms).map(([studyCode, forms]) => (
            <TableRow key={studyCode}>
              <TableCell>{studyCode}</TableCell>
              <TableCell>
                <Button
                  className="w-full"
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(`/distribute/${forms[0].studyCode}`)}
                >
                  Distribution link
                </Button>
              </TableCell>
              <TableCell>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Research Title</TableHead>
                      <TableHead>Created at</TableHead>
                      <TableHead>Consent link</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {forms.map((form) => (
                      <TableRow key={form.id}>
                        <TableCell>
                          <Link href={`/consent-forms/${form.id}`}>
                            {form.title}
                          </Link>
                        </TableCell>
                        <TableCell>{form.createdAt.toDateString()}</TableCell>
                        <TableCell>
                        <Button
                  className="w-full"
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(`/participant/${forms[0].id}`)}
                >
                  Consent link
                </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {offset !== null && (
        <Button
          className="mt-4 w-40"
          variant="secondary"
          onClick={() => onClick()}
        >
          Next Page
        </Button>
      )}
    </>
  );
}