'use client'

import Image from 'next/image'
import {isBrowser,browserName, browserVersion,osName, osVersion, engineName, engineVersion} from 'react-device-detect';
import { useEffect, useState } from 'react';

export default function Home() {
  const [browser, setBrowser] = useState(null);
  const [data, setData] = useState([]);
  const baseURL = `https://services.nvd.nist.gov/rest/json/cves/2.0?cpeName=cpe:2.3:a:google:{BROWSER_CPE}:{BROWSER_VERSION}:*:*:*:*:*:*:*&isVulnerable`;
  const defaultBrowserCPE = 'mozilla:firefox';

    // Mapping for browser CPE values
    const browserCPEMap = {
      chrome: 'google:chrome',
      firefox: 'mozilla:firefox',
      safari: 'apple:safari',
      edge: 'microsoft:edge',
      ie: 'microsoft:internet_explorer'
    };
  
  async function funcName(query)
  {
    const response = await fetch(query);
    const temp = await response.json();
    console.log(temp)
    setData(temp);
  }

  
  useEffect(() => {

    const baseURL = `https://services.nvd.nist.gov/rest/json/cves/2.0?cpeName=cpe:2.3:a:{BROWSER_NAME}:{BROWSER_VERSION}:*:*:*:*:*:*:*&isVulnerable`;
    const browserCPE = browserCPEMap[browserName.toLowerCase()] || defaultBrowserCPE;
    const URL = baseURL.replace('{BROWSER_NAME}', browserCPE).replace('{BROWSER_VERSION}', browserVersion);
    console.log(URL);

    funcName(URL);
    
  },[]);


  return (
    <main className="flex min-h-screen items-center justify-center p-24">
      <div className="mr-8 border border-gray-800 rounded">
        <h2 className='font-bold'>System Information</h2>
        <p>OS Name: {osName}</p>
        <p>OS Version: {osVersion}</p>
        <p>Browser Name: {browserName}</p>
        <p>Browser Version: {browserVersion}</p>
        <p>Engine Name: {engineName}</p>
        <p>Engine Version: {engineVersion}</p>
      </div>
      <div className='ml-20 w-2/3 border border-gray-800 rounded'>
        <h2 className='font-bold'>Vulnerabilities</h2>
        <ul>
          {data && data.vulnerabilities && data.vulnerabilities.length > 0 ? (
            data.vulnerabilities.map((vulnerability, index) => (
              <li key={index}>
                <h3>CVE ID: {vulnerability.cve.id}</h3>
                {vulnerability.cve.descriptions && vulnerability.cve.descriptions[0] && (
                  <p>Description: {vulnerability.cve.descriptions[0].value}</p>
                )}
                <p>Published: {vulnerability.cve.published}</p>
                {vulnerability.cve.metrics && vulnerability.cve.metrics.cvssMetricV2 && (
                  <>
                    <p>Base Severity: {vulnerability.cve.metrics.cvssMetricV2[0].baseSeverity}</p>
                    <p>Base Score: {vulnerability.cve.metrics.cvssMetricV2[0].cvssData.baseScore}</p>
                    <p>Access Complexity: {vulnerability.cve.metrics.cvssMetricV2[0].cvssData.accessComplexity}</p>
                    <p>Access Vector: {vulnerability.cve.metrics.cvssMetricV2[0].cvssData.accessVector}</p>
                  </>
                )}
                <br />
              </li>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </ul>
      </div>
    </main>
  );
  
}
