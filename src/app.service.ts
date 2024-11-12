import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getAllDepartments() {
    try {
      const response = await fetch(
        'https://collectionapi.metmuseum.org/public/collection/v1/departments',
        { method: 'GET' },
      );
      if (!response.ok) {
        console.error('Failed to fetch departments');
        return { message: 'Error fetching departments', data: null };
      }
      const data = await response.json();
      return { message: 'Departments fetched successfully', data };
    } catch (error) {
      console.error('Error:', error);
      return { message: 'Error fetching departments', data: null };
    }
  }

  async getDatas(departmentId: string, inputValue: string) {
    try {
      const response = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${departmentId}&title=true&q=${inputValue}`,
        { method: 'GET' },
      );
      if (!response.ok) {
        console.error('Failed to fetch search results');
        return { message: 'Error fetching search results', data: null };
      }
      const data = await response.json();
      if (!data.objectIDs || data.objectIDs.length === 0) {
        return { message: 'No data found', data: null };
      }

      const fetchMetData = async () => {
        try {
          const targetDataTenArray = data.objectIDs.slice(0, 10);
          const baseUrl =
            'https://collectionapi.metmuseum.org/public/collection/v1/objects/';

          const fetchPromises = targetDataTenArray.map((objectID) =>
            fetch(`${baseUrl}${objectID}`).then((res) => res.json()),
          );

          const allData = await Promise.all(fetchPromises);

          const filteredData = allData.map((item) => ({
            primaryImageSmall: item.primaryImageSmall,
            title: item.title,
            department: item.department,
            objectName: item.objectName,
            period: item.period,
            artistDisplayName: item.artistDisplayName,
            repository: item.repository,
            objectURL: item.objectURL,
          }));
          return filteredData;
        } catch (error) {
          console.error('Error fetching object details:', error);
          return null;
        }
      };

      const responseData = await fetchMetData();
      return responseData
        ? { message: 'Data fetched successfully', data: responseData }
        : { message: 'Error fetching detailed data', data: null };
    } catch (error) {
      console.error('Error:', error);
      return { message: 'Error fetching search results', data: null };
    }
  }
}
