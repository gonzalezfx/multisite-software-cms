<?php

namespace App\Http\Controllers;

use App\Helpers\GeneralHelper;
use App\Models\City;
use App\Models\Property;
use App\Models\PropertyType;
use App\Models\State;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    /**
     * Show the properties list view
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request  $request)
    {
        // Search filters
        $operationType = $request->operationType;
        $viewStyle = $request->view_style;

        $onlyInvest = $request->query('only_invest', null);
        $sortBy = $request->query('sort', 'new_asc');
        $searchText = $request->query('search', null);
        $priceMin = $request->query('price_min', null);
        $priceMax = $request->query('price_max', null);
        $propertyTypeName = $request->query('type', null);
        $cityName = $request->query('city', null);
        $stateName = $request->query('state', null);
        $locationColonyName = $request->query('location_colony', null);

        $propertyMaxPrice = Property::orderBy('sell_price', 'desc')->orderBy('rent_price', 'desc');

        switch ($operationType) {
            case GeneralHelper::PROPERTY_OPERATION_RENT:
                $propertyMaxPrice = $propertyMaxPrice->where('is_rent_operation', 1);
                $propertyMaxPrice = $propertyMaxPrice->where('is_sell_operation', 0);

                break;
            case GeneralHelper::PROPERTY_OPERATION_SELL:
                $propertyMaxPrice = $propertyMaxPrice->where('is_rent_operation', 0);
                $propertyMaxPrice = $propertyMaxPrice->where('is_sell_operation', 1);
                break;
        }

        $propertyMaxPrice = $propertyMaxPrice->first();

        if ($propertyMaxPrice) {
            if (!empty($propertyMaxPrice->sell_price)) {
                $priceToUse = $propertyMaxPrice->sell_price;
            } else {
                $priceToUse = $propertyMaxPrice->rent_price;
            }

            $maxExistingPrice = round(round($priceToUse), -2);
        } else {
            $maxExistingPrice = 1000;
        }

        // Get filtered properties
        $queryBuilder = Property::where('show_in_list', 1)
            ->when(
                $propertyTypeName,
                function ($query, $propertyTypeName) {
                    $query->whereHas(
                        'propertyType',
                        function ($query) use ($propertyTypeName) {
                            $query->where('name', $propertyTypeName);
                        }
                    );
                }
            )
            ->when(
                $searchText,
                function ($query, $searchText) {
                    $query->where('name', 'like', '%'.GeneralHelper::escapeLike($searchText).'%');
                }
            )
            ->when(
                $priceMin,
                function ($query, $priceMin) {
                    $query->where(
                        function ($query) use ($priceMin) {
                            $query->where('rent_price', '>=', $priceMin);
                            $query->orWhere('sell_price', '>=', $priceMin);
                        }
                    );
                }
            )
            ->when(
                $cityName,
                function ($query, $cityName) {
                    $query->whereHas(
                        'city',
                        function ($query) use ($cityName) {
                            $query->where('name', $cityName);
                        }
                    );
                }
            )
            ->when(
                $stateName,
                function ($query, $stateName) {
                    $query->whereHas(
                        'city.state',
                        function ($query) use ($stateName) {
                            $query->where('name', $stateName);
                        }
                    );
                }
            )
            ->when(
                $sortBy,
                function ($query, $sortBy) {

                    switch ($sortBy) {
                        case 'new_asc':
                            $query->orderBy('created_at', 'asc')
                            ->orderBy('id', 'asc');
                            break;
                        case 'new_desc':
                            $query->orderBy('created_at', 'desc')
                            ->orderBy('id', 'desc');
                            break;
                        case 'price_desc':
                            $query->orderBy('sell_price', 'desc');
                            $query->orderBy('rent_price', 'desc');
                            break;
                        case 'price_asc':
                            $query->orderBy('rent_price', 'asc');
                            $query->orderBy('sell_price', 'asc');
                            break;
                    }
                }
            )
            ->when(
                $operationType,
                function ($query, $operationType) {

                    $query->where(
                        function ($query) use ($operationType) {
                            switch ($operationType) {
                                case GeneralHelper::PROPERTY_OPERATION_RENT:
                                    $query->where('is_rent_operation', 1);
                                    break;
                                case GeneralHelper::PROPERTY_OPERATION_SELL:
                                    $query->where('is_sell_operation', 1);
                                    break;
                                case GeneralHelper::PROPERTY_OPERATION_RENT_AND_SELL:
                                    $query->where('is_sell_operation', 1);
                                    $query->orWhere('is_rent_operation', 1);
                                    break;
                            }
                        }
                    );
                }
            )
            ->whereHas(
                'propertyType',
                function ($query) use ($onlyInvest) {

                    if ($onlyInvest) {
                        $query->where('is_piece_of_land', 1);
                    } else {
                        $query->where('is_piece_of_land', 0);
                    }
                }
            )
            ->when(
                $locationColonyName,
                function ($query, $locationColonyName) {
                    $query->where('location_colony', $locationColonyName);
                }
            )
            ->orderBy('created_at', ($sortBy == 'new_asc') ? 'asc' : 'desc');

        $suggestedQueryBuilder = clone $queryBuilder;
        $properties = $queryBuilder->when(
            $priceMax,
            function ($query, $priceMax) {
                $query->where(
                    function ($query) use ($priceMax) {
                        $query->where('rent_price', '<=', $priceMax);
                        $query->orWhere('sell_price', '<=', $priceMax);
                        $query->orWhere('sell_price', '<=', 12);
                    }
                );
            }
        )
            ->paginate(15);

        if ($priceMax && $operationType == GeneralHelper::PROPERTY_OPERATION_RENT) {
                $priceMaxWithExtra = $priceMax + 1000;

                $suggestedProperties = $suggestedQueryBuilder->where(
                    function ($query) use ($priceMax, $priceMaxWithExtra) {
                        $query->where('rent_price', '<=', $priceMaxWithExtra);
                        $query->where('rent_price', '>', $priceMax);
                    }
                )
                ->limit(6)
                ->get();
        } else {
            $suggestedProperties = collect([]);
        }

        $usePieceOfLand = $onlyInvest ? 1 : 0;
        $propertyTypes = PropertyType::where('is_piece_of_land', $usePieceOfLand)->get();

        $states = State::has('cities')->get();
        $cities = City::when(
            $stateName,
            function ($query, $stateName) {
                $query->whereHas(
                    'state',
                    function ($query) use ($stateName) {
                        $query->where('name', $stateName);
                    }
                );
            }
        )
            ->get();
        $propertyColonies = Property::select('location_colony')
            ->when(
                $stateName,
                function ($query, $stateName) {
                    $query->whereHas(
                        'city.state',
                        function ($query) use ($stateName) {
                            $query->where('name', $stateName);
                        }
                    );
                }
            )
            ->when(
                $cityName,
                function ($query, $cityName) {
                    $query->whereHas(
                        'city',
                        function ($query) use ($cityName) {
                            $query->where('name', $cityName);
                        }
                    );
                }
            )
            ->groupBy('location_colony')
            ->get();

        return view(
            'property/index',
            [
                'onlyInvest' => $onlyInvest,
                'sortBy' => $sortBy,
                'searchText' => $searchText,
                'priceMin' => $priceMin,
                'priceMax' => $priceMax,
                'operationType' => $operationType,
                'viewStyle' => $viewStyle,
                'propertyTypeName' => $propertyTypeName,
                'cityName' => $cityName,
                'stateName' => $stateName,
                'maxExistingPrice' => $maxExistingPrice,
                'properties' => $properties,
                'suggestedProperties' => $suggestedProperties,
                'propertyTypes' => $propertyTypes,
                'states' => $states,
                'cities' => $cities,
                'propertyColonies' => $propertyColonies,
                'locationColonyName' => $locationColonyName,
            ]
        );
    }

    /**
     * Show property detail.
     *
     * @param  \App\Models\Property $property
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function view(Property $property)
    {
        return view(
            'property.view',
            [ 'property' => $property ]
        );
    }
}
