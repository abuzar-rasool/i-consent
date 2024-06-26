import * as React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption
} from '../../../@/components/ui/table';
import { ConsentForm, ParticipantResponse } from '@prisma/client';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

const ConsentFormDisplay = async ({
  consentForm
}: {
  consentForm: ConsentForm;
}) => {
  const participantResponses: ParticipantResponse[] =
    await prisma.participantResponse.findMany({
      where: {
        consentFormId: consentForm.id
      }
    });

  return (
    <main className="flex flex-1 flex-col p-4 md:p-6">
      <div className="flex items-center mb-8">
        <h1 className="font-semibold text-lg md:text-2xl">
          {consentForm.title}
        </h1>
      </div>
      <Table className="table-auto w-full border-collapse border border-gray-200">
        <TableHeader>
          <TableRow>
            <TableHead>Field</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Institution</TableCell>
            <TableCell>
              {consentForm.institution ? consentForm.institution : 'N/A'}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Study Code</TableCell>
            <TableCell>
              {consentForm.studyCode ? consentForm.studyCode : 'N/A'}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Research Type</TableCell>
            <TableCell>{consentForm.researchType}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Purpose</TableCell>
            <TableCell>{consentForm.purpose}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Goal</TableCell>
            <TableCell>{consentForm.goal}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Duration</TableCell>
            <TableCell>
              {consentForm.duration} {consentForm.durationUnit}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Participants</TableCell>
            <TableCell>{consentForm.participants}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Study Options</TableCell>
            <TableCell>
              <ul>
                {consentForm.studyOptions.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Compensation</TableCell>
            <TableCell>{consentForm.compensation}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Procedure Steps</TableCell>
            <TableCell>
              <ul>
                {consentForm.procedureSteps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Collected Data</TableCell>
            <TableCell>
              <ul>
                {consentForm.collectedData.map((data, index) => (
                  <li key={index}>{data}</li>
                ))}
              </ul>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Anonymization</TableCell>
            <TableCell>{consentForm.anonymization}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Publication</TableCell>
            <TableCell>{consentForm.publication}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Principal Investigator</TableCell>
            <TableCell>
              {consentForm.principalInvestigator} (
              {consentForm.principalInvestigatorEmail})
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Researchers</TableCell>
            <TableCell>
              {consentForm.researcherNames
                ? consentForm.researcherNames
                : 'N/A'}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Researcher Emails</TableCell>
            <TableCell>
              {consentForm.researcherEmails
                ? consentForm.researcherEmails
                : 'N/A'}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Funding</TableCell>
            <TableCell>
              {consentForm.funding ? consentForm.funding : 'N/A'}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ethical Committee</TableCell>
            <TableCell>
              {consentForm.ethicalCommittee
                ? consentForm.ethicalCommittee
                : 'N/A'}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Signing Method</TableCell>
            <TableCell>{consentForm.signingMethod}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Form Link</TableCell>
            <TableCell>
              <a
                href={consentForm.formLink}
                target="_blank"
                className="text-blue-500 underline"
              >
                View Consent Form
              </a>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Created At</TableCell>
            <TableCell>{consentForm.createdAt.toDateString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Updated At</TableCell>
            <TableCell>{consentForm.updatedAt.toDateString()}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="flex items-center mb-8 mt-8">
        <h3 className="font-semibold text-lg md:text-1xl">
          Participant Responses
        </h3>
      </div>
      {participantResponses.length === 0 && (
        <div className="flex items-center justify-center">
          <p>No responses yet.</p>
        </div>
      )}
      {participantResponses.length > 0 && (
        <Table className="table-auto w-full border-collapse border border-gray-200">
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Response</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participantResponses.map((response) => (
              <TableRow key={response.id}>
                <TableCell>{response.id}</TableCell>
                <TableCell>
                  {`${response.firstName} ${response.lastName}`}{' '}
                </TableCell>
                <TableCell>{response.participantEmail}</TableCell>
                <TableCell>
                  {response.consentState == 'NOT_GRANTED'
                    ? 'Not granted'
                    : 'Granted'}
                </TableCell>
                <TableCell>{`${response.updatedAt.toTimeString()} ${response.updatedAt.toDateString()}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </main>
  );
};

export default ConsentFormDisplay;
