
"use client";

import { useRouter} from 'next/navigation';


interface DistributeClientPageProps {
    consentFormID: string;
    }


export  const DistributeClientPage: React.FC<DistributeClientPageProps> = ({
    consentFormID
}) => {
    const router = useRouter();
    router.push(`/participant/${consentFormID}`);

    return null;
}